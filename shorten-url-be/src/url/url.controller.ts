import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { UrlService } from './url.service';
import { ThrottlerGuard, Throttle } from '@nestjs/throttler';

@Controller('url')
@UseGuards(ThrottlerGuard)
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Get(':id')
  @Throttle({ default: { limit: 120, ttl: 60000 } }) // Allow 120 requests per minute
  async getOriginalUrl(@Param('id') id: string) {
    return await this.urlService.findOriginalUrl(id);
  }

  @Post()
  @Throttle({ default: { limit: 60, ttl: 60000 } }) // Allow 60 requests per minute
  async createShortUrl(@Body('url') url: string) {
    return await this.urlService.createShortUrl(url);
  }

  @Post('bulk')
  @Throttle({ default: { limit: 15, ttl: 60000 } }) // Allow 15 requests per minute
  async createBulkUrls(@Body('urls') urls: string[]) {
    return this.urlService.createBulkShortUrls(urls);
  }
}
