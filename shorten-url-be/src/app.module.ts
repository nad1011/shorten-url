import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { UrlModule } from './url/url.module';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';
import configuration from './config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Configuration Module
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    // Database Module
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
      }),
      inject: [ConfigService],
    }),

    // Redis Cache Module
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          socket: {
            host: configService.get('redis.host'),
            port: configService.get('redis.port'),
          },
          ttl: configService.get('cache.ttl') * 1000,
        }),
      }),
      inject: [ConfigService],
    }),

    // Rate Limiting Module
    ThrottlerModule.forRootAsync({
      useFactory: async (
        configService: ConfigService,
      ): Promise<ThrottlerModuleOptions> => ({
        throttlers: [
          {
            ttl: configService.get('throttle.ttl') * 1000,
            limit: configService.get('throttle.limit'),
          },
        ],
        storage: new ThrottlerStorageRedisService({
          host: configService.get('redis.host'),
          port: configService.get('redis.port'),
          db: configService.get('redis.db'),
        }),
      }),
      inject: [ConfigService],
    }),

    // Feature Modules
    UrlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
