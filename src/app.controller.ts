import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('server')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getPing(): string {
    return this.appService.getPing();
  }
}
