import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TorrentService } from './torrent.service';

@Controller('torrents')
export class TorrentController {
  constructor(private readonly torrentService: TorrentService) {}

  @Post()
  @UseInterceptors(FileInterceptor('torrent'))
  async addTorrent(
    @UploadedFile() torrent: Express.Multer.File,
    @Body() infos,
  ) {
    //console.log(torrent.originalname);
    //console.log(infos);
    await this.torrentService.addTorrent(torrent, infos);

    return { filename: torrent.originalname, size: torrent.size };
  }
}
