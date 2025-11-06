import { Controller, Get, Req, Param, StreamableFile } from '@nestjs/common';
import { AnnouncerService } from './announcer.service';
import type { Request } from 'express';
@Controller('announce')
export class AnnouncerController {
  constructor(private readonly announceService: AnnouncerService) {}

  /**
   * Respond to announces from torrent clients
   * @param request {Request}
   * @param passkey {string}
   * @returns {StreamableFile}
   */
  @Get(':passkey')
  announce(
    @Req() request: Request,
    @Param('passkey') passkey: string,
  ): Promise<StreamableFile> {
    return this.announceService.announce(request, passkey);
  }
}
