import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { UrlService } from './url.service';
import { ThrottlerGuard, Throttle } from '@nestjs/throttler';

@Controller('url')
@UseGuards(ThrottlerGuard)
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Get(':id')
  @Throttle({ default: { limit: 120000, ttl: 60000 } }) // Allow 120000 requests per minute
  async getOriginalUrl(@Param('id') id: string) {
    return await this.urlService.findOriginalUrl(id);
  }

  @Post()
  @Throttle({ default: { limit: 60000, ttl: 60000 } }) // Allow 60000 requests per minute
  async createShortUrl(@Body('url') url: string) {
    return await this.urlService.createShortUrl(url);
  }

  @Post('bulk')
  @Throttle({ default: { limit: 15000, ttl: 60000 } }) // Allow 15000 requests per minute
  async createBulkUrls(@Body('urls') urls: string[]) {
    return this.urlService.createBulkShortUrls(urls);
  }

  @Post('qr')
  @Throttle({ default: { limit: 60000, ttl: 60000 } }) // Allow 60000 requests per minute
  async generateQrCode(@Body('url') url: string) {
    return this.urlService.createQrCode(url);
  }
}
