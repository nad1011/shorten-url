import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { UrlService } from './url.service';
import { CustomThrottle } from 'src/decorators/throttler.decorator';

@Controller('url')
@UseGuards(ThrottlerGuard)
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Get(':id')
  @CustomThrottle(5, 60) // Allow 20 requests per minute
  async getOriginalUrl(@Param('id') id: string) {
    return await this.urlService.findOriginalUrl(id);
  }

  @Post()
  @CustomThrottle(5, 60) // Allow 5 requests per minute
  async createShortUrl(@Body('url') url: string) {
    return await this.urlService.createShortUrl(url);
  }

  @Post('bulk')
  @CustomThrottle(5, 60) // Allow 5 requests per minute
  async createBulkUrls(@Body('urls') urls: string[]) {
    return this.urlService.createBulkShortUrls(urls);
  }
}
