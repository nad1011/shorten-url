import {
  Injectable,
  NotFoundException,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Url } from './schemas/url.schema';
import { ConfigService } from '@nestjs/config';
import { RedisClientType } from 'redis';
import { RedisStore } from 'cache-manager-redis-yet';

@Injectable()
export class UrlService {
  private readonly redisClient: RedisClientType;
  constructor(
    @InjectModel(Url.name) private readonly urlModel: Model<Url>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {
    this.redisClient = (cacheManager.store as RedisStore).client;
  }

  async findOriginalUrl(shortId: string): Promise<string> {
    try {
      const cachedUrl = await this.redisClient.hGet('url_mappings', shortId);
      if (cachedUrl) {
        this.updateLastAccessed(shortId).catch((err) =>
          console.error('Error updating visit count:', err),
        );
        return cachedUrl;
      }

      const url = await this.urlModel.findOne({ shortId });
      if (!url) {
        throw new NotFoundException('URL not found');
      }

      await this.updateLastAccessed(shortId);

      await this.cacheManager.set(
        `url:${shortId}`,
        url.originalUrl,
        this.configService.get('cache.ttl') * 1000,
      );
      await this.redisClient
        .multi()
        .hSet('url_mappings', shortId, url.originalUrl)
        .expire('url_mappings', this.configService.get('cache.ttl') * 1000)
        .exec();

      return url.originalUrl;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error in findOriginalUrl:', error);
      throw new Error('Error processing request');
    }
  }

  private async updateLastAccessed(shortId: string): Promise<void> {
    await this.urlModel.updateOne(
      { shortId },
      {
        $set: { lastAccessed: new Date() },
      },
    );
  }

  async createShortUrl(originalUrl: string): Promise<string> {
    try {
      const existingIds = await this.findByOriginalUrl(originalUrl);

      if (existingIds) {
        return existingIds;
      }

      const shortId = (await this.generateUniqueShortIds()) as string;

      const url = new this.urlModel({
        shortId,
        originalUrl,
        lastAccessed: new Date(),
      });

      await url.save();

      await this.redisClient
        .multi()
        .hSet('url_mappings', shortId, originalUrl)
        .expire('url_mappings', this.configService.get('cache.ttl') * 1000)
        .exec();

      // await this.cacheManager.set(
      //   `url:${shortId}`,
      //   originalUrl,
      //   this.configService.get('cache.ttl') * 1000,
      // );

      return url.shortId;
    } catch (error) {
      console.error('Error in createShortUrl:', error);
      throw new Error('Error creating short URL');
    }
  }

  private async findByOriginalUrl(originalUrl: string): Promise<string | null> {
    const allEntries = await this.redisClient.hGetAll('url_mappings');

    for (const [shortId, url] of Object.entries(allEntries)) {
      if (url === originalUrl) {
        return shortId;
      }
    }

    const url = await this.urlModel.findOne({ originalUrl }).select('shortId');

    if (url) {
      return url.shortId;
    }

    return null;
  }

  async createBulkShortUrls(originalUrls: string[]): Promise<Url[]> {
    const batchSize = this.configService.get('url.bulkBatchSize', 1000);
    const results: Url[] = [];

    try {
      if (!Array.isArray(originalUrls)) {
        throw new BadRequestException('Input must be an array of URLs');
      }

      if (originalUrls.length === 0) {
        throw new BadRequestException('URL array cannot be empty');
      }

      const shortIdResults = (await this.generateUniqueShortIds(
        originalUrls.length,
      )) as string[];

      const urlDocuments = originalUrls.map((url, index) => ({
        shortId: shortIdResults[index],
        originalUrl: url,
        lastAccessed: new Date(),
      }));

      for (let i = 0; i < urlDocuments.length; i += batchSize) {
        const batch = urlDocuments.slice(i, i + batchSize);
        const insertedUrls = await this.urlModel.insertMany(batch, {
          ordered: false,
          rawResult: true,
        });
        results.push(...(insertedUrls.mongoose.results as unknown as Url[]));
      }

      for (let i = 0; i < urlDocuments.length; i += batchSize) {
        const batch = urlDocuments.slice(i, i + batchSize);
        await Promise.all(
          batch.map((doc) =>
            this.cacheManager.set(
              `url:${doc.shortId}`,
              doc.originalUrl,
              this.configService.get('cache.ttl') * 1000,
            ),
          ),
        );
      }

      return results;
    } catch (error) {
      console.error(`Error in createBulkShortUrls: ${error.message}`);
      throw error;
    }
  }

  private async generateUniqueShortIds(
    count: number = 1,
  ): Promise<string | string[]> {
    const result: string[] = [];

    let attempts = 0;

    const maxAttempts = this.configService.get('url.maxGenerationAttempts');

    while (result.length < count && attempts < maxAttempts) {
      attempts++;

      const newIds = Array(count - result.length)
        .fill(0)
        .map(() => this.generateShortId());

      const existingIdsInDatabase = await this.urlModel
        .find({
          shortId: { $in: newIds },
        })
        .select('shortId')
        .lean();

      const existingIds = new Set(
        existingIdsInDatabase.map((url) => url.shortId),
      );
      const uniqueNewIds = newIds.filter((id) => !existingIds.has(id));

      result.push(...uniqueNewIds);
    }

    if (result.length < count) {
      throw new Error('Could not generate enough unique short IDs');
    }

    return result.length === 1 ? result[0] : result;
  }

  private generateShortId(length: number = 5): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
