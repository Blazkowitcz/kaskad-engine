import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
  Param,
  StreamableFile,
  Query,
  Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TorrentService } from './torrent.service';
import { IsAuthGuard } from '../../common/guards/auth.guard';
import type { UserRequest } from '../user/user.entity';
import { AddTorrentDto } from './dtos/torrent-add.dto';
import { Torrent, type TorrentQuery } from './torrent.entity';
import { EditTorrentDto } from './dtos/torrent-edit.dto';

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
  @Post('/upload')
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

  /**
   * Download Torrent file
   * @param torrentSlug {String}
   * @param userRequest {UserRequest}
   * @returns {StreamableFile}
   */
  @Get('/download/:torrent_slug')
  @UseGuards(IsAuthGuard)
  async download(
    @Param('torrent_slug') torrentSlug: string,
    @Req() userRequest: UserRequest,
  ): Promise<StreamableFile> {
    return await this.torrentService.downloadTorrent(torrentSlug, userRequest);
  }

  /**
   * Get 20 last torrents
   */
  @Get('/last')
  @UseGuards(IsAuthGuard)
  async getLastTorrents(): Promise<Torrent[]> {
    return await this.torrentService.getLastTorrents();
  }

  /**
   * Get 20 best torrents
   */
  @Get('/best')
  @UseGuards(IsAuthGuard)
  async getBestTorrents(): Promise<Torrent[]> {
    return await this.torrentService.getBestTorrents();
  }

  /**
   * Search torrents with query filters
   * @param query {String}
   * @returns {Torrent[]}
   */
  @Get('/search')
  @UseGuards(IsAuthGuard)
  async searchTorrents(
    @Query()
    query: TorrentQuery,
  ): Promise<Torrent[]> {
    return await this.torrentService.searchTorrents(query);
  }

  /**
   * Get torrent details
   * @param torrentSlug {String}
   * @returns {Torrent}
   */
  @Get('/:torrent_slug')
  @UseGuards(IsAuthGuard)
  async getTorrentDetails(
    @Param('torrent_slug') torrentSlug: string,
  ): Promise<Torrent> {
    return await this.torrentService.getTorrentDetails(torrentSlug);
  }

  /**
   * Set of unset torrent freeleech
   * @param dto {EditTorrentDto}
   * @returns {Boolean}
   */
  @Put('setOrUnsetTorrentFreeleech')
  @UseGuards(IsAuthGuard)
  async setOrUnsetTorrentFreeleech(
    @Body() dto: EditTorrentDto,
  ): Promise<boolean> {
    return await this.torrentService.setOrUnsetTorrentFreeleech(dto);
  }
}
