import { Controller, Get, Req, Param, StreamableFile } from '@nestjs/common';
import { AnnouncerService } from './announcer.service';
import type { Request } from 'express';
@Controller('announce')
export class AnnouncerController {
  constructor(private readonly announceService: AnnouncerService) {}

  @Get(':passkey')
  announce(
    @Req() request: Request,
    @Param('passkey') passkey: string,
  ): Promise<StreamableFile> {
    return this.announceService.announce(request, passkey);
  }
}
