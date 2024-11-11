import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getAppInfo()).toEqual({
        name: 'URL Shortener API',
        version: '1.0.0',
        description: 'URL shortening service',
        environment: 'development',
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
      });
    });
  });
});
