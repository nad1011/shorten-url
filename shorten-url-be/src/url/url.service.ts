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
import { BulkCreateResult, Result } from './types';
import { generateShortId } from './utils';
import * as QRCode from 'qrcode';
import { QRCodeErrorCorrectionLevel } from 'qrcode';

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

  // Find original URL service
  async findOriginalUrl(shortId: string): Promise<Result> {
    try {
      const cachedUrl = await this.redisClient.hGet('url_mappings', shortId);
      if (cachedUrl) {
        this.updateLastAccessed(shortId).catch((err) =>
          console.error('Error updating visit count:', err),
        );
        return {
          data: {
            shortId,
            originalUrl: cachedUrl,
          },
          error: null,
        };
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

      return {
        data: {
          shortId,
          originalUrl: url.originalUrl,
          qrCode: url.qrCode,
        },
        error: null,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error in findOriginalUrl:', error);
      throw new Error('Error processing request');
    }
  }

  // Create short URL service
  async createShortUrl(originalUrl: string): Promise<Result> {
    try {
      const existingIds = await this.findIdByOriginalUrl(originalUrl);

      if (existingIds) {
        return {
          data: {
            shortId: existingIds,
            originalUrl,
          },
          error: null,
        };
      }

      const shortId = await this.generateUniqueShortIds(1).then((res) =>
        res.at(0),
      );

      const url = new this.urlModel({
        shortId,
        originalUrl,
        lastAccessed: new Date(),
        accessTimes: 0,
      });

      await url.save();

      await this.redisClient
        .multi()
        .hSet('url_mappings', shortId, originalUrl)
        .expire('url_mappings', this.configService.get('cache.ttl') * 1000)
        .exec();

      return {
        data: {
          shortId,
          originalUrl,
        },
        error: null,
      };
    } catch (error) {
      console.error('Error in createShortUrl:', error);
      throw new Error('Error creating short URL');
    }
  }

  // Create bulk short URLs service
  async createBulkShortUrls(originalUrls: string[]): Promise<Result> {
    const batchSize = this.configService.get('url.bulkBatchSize', 1000);
    const result: BulkCreateResult = {
      successful: [],
      failed: [],
      existing: [],
    };

    try {
      if (!Array.isArray(originalUrls)) {
        throw new BadRequestException('Input must be an array of URLs');
      }

      if (originalUrls.length === 0) {
        throw new BadRequestException('URL array cannot be empty');
      }

      const processedUrls = await Promise.all(
        originalUrls.map(async (url) => {
          try {
            const existingId = await this.findIdByOriginalUrl(url);
            if (existingId) {
              result.existing.push({
                originalUrl: url,
                shortId: existingId,
              });
              return null;
            }
            return url;
          } catch (error) {
            result.failed.push({
              originalUrl: url,
              error: error.message,
            });
            return null;
          }
        }),
      );

      const newUrls = processedUrls.filter(
        (url): url is string => url !== null,
      );

      if (newUrls.length > 0) {
        const shortIds = (await this.generateUniqueShortIds(
          newUrls.length,
        )) as string[];

        const urlDocuments = newUrls.map((url, index) => ({
          shortId: shortIds[index],
          originalUrl: url,
          lastAccessed: new Date(),
        }));

        for (let i = 0; i < urlDocuments.length; i += batchSize) {
          const batch = urlDocuments.slice(i, i + batchSize);
          try {
            const insertedDocs = await this.urlModel.insertMany(batch, {
              ordered: false,
            });

            const pipeline = this.redisClient.multi();

            insertedDocs.forEach((doc) => {
              pipeline.hSet('url_mappings', doc.shortId, doc.originalUrl);
            });

            pipeline.expire(
              'url_mappings',
              this.configService.get('cache.ttl') * 1000,
            );

            await pipeline.exec();

            result.successful.push(
              ...insertedDocs.map((doc) => ({
                shortId: doc.shortId,
                originalUrl: doc.originalUrl,
              })),
            );
          } catch (error) {
            if (error.writeErrors) {
              error.writeErrors.forEach((writeError: any) => {
                result.failed.push({
                  originalUrl: batch[writeError.index].originalUrl,
                  error: writeError.errmsg,
                });
              });
            } else {
              batch.forEach((doc) => {
                result.failed.push({
                  originalUrl: doc.originalUrl,
                  error: error.message,
                });
              });
            }
          }
        }
      }

      return {
        data: result,
        error: null,
      };
    } catch (error) {
      console.error(`Error in createBulkShortUrls: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  // Generate QR code service
  async createQrCode(originalUrl: string): Promise<Result> {
    try {
      const existingIds = await this.findIdByOriginalUrl(originalUrl);

      if (existingIds) {
        return {
          data: {
            shortId: existingIds,
            originalUrl,
            qrCode: await this.generateQrCodeSvg(existingIds),
          },
          error: null,
        };
      }

      const shortId = await this.generateUniqueShortIds(1).then((res) =>
        res.at(0),
      );
      const qrCode = await this.generateQrCodeSvg(shortId);

      const url = new this.urlModel({
        shortId,
        originalUrl,
        lastAccessed: new Date(),
        qrCode,
        accessTimes: 0,
      });

      await url.save();

      await this.redisClient
        .multi()
        .hSet('url_mappings', shortId, originalUrl)
        .expire('url_mappings', this.configService.get('cache.ttl') * 1000)
        .exec();

      return {
        data: {
          shortId,
          originalUrl,
          qrCode,
        },
        error: null,
      };
    } catch (error) {
      console.error('Error in createQrCode:', error);
      throw new Error('Error generating QR code');
    }
  }

  // All the methods below are private methods
  private async generateQrCodeSvg(shortId: string): Promise<string> {
    try {
      const cacheKey = `qr:${shortId}`;
      const cachedQr = await this.cacheManager.get<string>(cacheKey);

      if (cachedQr) {
        console.debug(`Cache hit for QR code: ${shortId}`);
        return cachedQr;
      }

      const fullUrl = `${this.configService.get('url.clientUrl')}/url/${shortId}`;

      const qrOptions = {
        type: 'svg' as const,
        errorCorrectionLevel: 'H' as QRCodeErrorCorrectionLevel,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      };

      const qrCode = await QRCode.toString(fullUrl, qrOptions);

      // Cache the generated QR code
      await this.cacheManager.set(
        cacheKey,
        qrCode,
        this.configService.get('cache.ttl') * 1000,
      );

      return qrCode;
    } catch (error) {
      console.error(`Error generating QR code for ${shortId}:`, error);
      throw new Error('Failed to generate QR code');
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

  private async findIdByOriginalUrl(
    originalUrl: string,
  ): Promise<string | null> {
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

  private async generateUniqueShortIds(count: number): Promise<string[]> {
    const result: string[] = [];

    let attempts = 0;

    const maxAttempts = this.configService.get('url.maxGenerationAttempts');

    while (result.length < count && attempts < maxAttempts) {
      attempts++;

      const newIds = Array(count - result.length)
        .fill(0)
        .map(() => generateShortId());

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

    return result;
  }
}
