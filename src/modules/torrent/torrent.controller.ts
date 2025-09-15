import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TorrentService } from './torrent.service';
import { IsAuthGuard } from '../../common/guards/auth.guard';
import type { UserRequest } from '../user/user.entity';
import { AddTorrentDto } from './dtos/torrent-add.dto';
import { Torrent } from './torrent.entity';

@Controller('torrents')
export class TorrentController {
  constructor(private readonly torrentService: TorrentService) {}

  /**
   * Add new Torrent
   * @param torrent {Express.Multer.File}
   * @param request {UserRequest}
   * @param infos {AddTorrentDto}
   * @returns {Boolean}
   */
  @Post()
  @UseGuards(IsAuthGuard)
  @UseInterceptors(FileInterceptor('torrent'))
  async addTorrent(
    @UploadedFile() torrent: Express.Multer.File,
    @Req() request: UserRequest,
    @Body() infos: AddTorrentDto,
  ): Promise<boolean> {
    await this.torrentService.addTorrent(torrent, infos, request);
    return true;
  }

  @Get('/last')
  @UseGuards(IsAuthGuard)
  async getLastTorrents(): Promise<Torrent[]> {
    return await this.torrentService.getLastTorrents();
  }
}
