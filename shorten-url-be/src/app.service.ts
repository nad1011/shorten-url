import { Injectable, Inject, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @InjectConnection() private readonly mongoConnection: Connection,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {}

  async getHealthStatus() {
    const startTime = Date.now();
    const status = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: await this.checkMongoHealth(),
        cache: await this.checkRedisHealth(),
      },
      uptime: process.uptime(),
      environment: this.configService.get('app.env'),
    };

    if (!status.services.database || !status.services.cache) {
      status.status = 'degraded';
    }

    const duration = Date.now() - startTime;
    this.logger.log(`Health check completed in ${duration}ms`);

    return status;
  }

  private async checkMongoHealth(): Promise<boolean> {
    try {
      if (this.mongoConnection) {
        const dbState = this.mongoConnection.readyState;
        if (dbState === 1) {
          await this.mongoConnection.db.admin().ping();
          return true;
        }
      }
      return false;
    } catch (error) {
      this.logger.error('MongoDB health check failed:', error);
      return false;
    }
  }

  private async checkRedisHealth(): Promise<boolean> {
    try {
      const testKey = 'health-check-' + Date.now();
      await this.cacheManager.set(testKey, 'ok', 1000);
      const testValue = await this.cacheManager.get(testKey);
      await this.cacheManager.del(testKey);
      return testValue === 'ok';
    } catch (error) {
      this.logger.error('Redis health check failed:', error);
      return false;
    }
  }

  getAppInfo() {
    return {
      name: 'URL Shortener API',
      version: this.configService.get('app.version'),
      description: 'URL shortening service',
      environment: this.configService.get('app.env'),
      endpoints: {
        health: '/health',
        createUrl: '/url',
        createBulkUrls: '/url/bulk',
        getUrl: '/url/:id',
      },
      features: {
        caching: true,
        rateLimiting: true,
        monitoring: true,
      },
    };
  }
}
