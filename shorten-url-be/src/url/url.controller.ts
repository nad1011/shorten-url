import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { ThrottlerGuard, Throttle } from '@nestjs/throttler';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('url')
@UseGuards(ThrottlerGuard)
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Get('user')
  @UseGuards(AuthGuard)
  @Throttle({ default: { limit: 90000, ttl: 60000 } }) // Allow 90000 requests per minute
  async getUserUrls(@Req() request: any) {
    return await this.urlService.findUserUrls(request.user.sub);
  }

  @Get(':id')
  @Throttle({ default: { limit: 120000, ttl: 60000 } }) // Allow 120000 requests per minute
  async getOriginalUrl(@Param('id') id: string) {
    return await this.urlService.findOriginalUrl(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Throttle({ default: { limit: 60000, ttl: 60000 } }) // Allow 60000 requests per minute
  async createShortUrl(@Body('url') url: string, @Req() request: any) {
    const userId = request.user ? request.user.sub : null;
    return await this.urlService.createShortUrl(url, userId);
  }

  @Post('bulk')
  @Throttle({ default: { limit: 15000, ttl: 60000 } }) // Allow 15000 requests per minute
  async createBulkUrls(@Body('urls') urls: string[]) {
    return this.urlService.createBulkShortUrls(urls);
  }

  @Post('qr')
  @UseGuards(AuthGuard)
  @Throttle({ default: { limit: 60000, ttl: 60000 } }) // Allow 60000 requests per minute
  async generateQrCode(@Body('url') url: string, @Req() request: any) {
    const userId = request.user ? request.user.sub : null;
    return this.urlService.createQrCode(url, userId);
  }
}
