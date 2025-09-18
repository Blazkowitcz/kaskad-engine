import { Controller, Get, Req, Param } from '@nestjs/common';
import { AnnouncerService } from './announcer.service';
import type { Request } from 'express';
@Controller('announce')
export class AnnouncerController {
  constructor(private readonly announceService: AnnouncerService) {}

  @Get(':passkey')
  announce(
    @Req() request: Request,
    @Param('passkey') passkey: string,
  ): Promise<Buffer> {
    return this.announceService.announce(request, passkey);
  }
}
