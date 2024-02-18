import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
 ApiTags,
 ApiResponse,
 ApiOperation
} from '@nestjs/swagger';

@Controller('v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('health')
  @ApiOperation({ summary: 'health check of the api server' })
  @Get('health')
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({ status: 503, description: 'service unavailable' })
  health(): string {
    return this.appService.getHello();
  }
}
