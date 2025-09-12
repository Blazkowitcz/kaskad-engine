import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Torrent } from './torrent.entity';
import { AddTorrentDto } from './dtos/torrent-add.dto';
import ParseTorrentFile from 'parse-torrent-file';

@Injectable()
export class TorrentService {
  constructor(
    @InjectRepository(Torrent)
    private readonly torrentRepository: Repository<Torrent>,
  ) {}

  async addTorrent(file: Express.Multer.File, information: AddTorrentDto) {
    const torrentInfo = ParseTorrentFile(file.buffer);
    const torrent = this.torrentRepository.create({
      name: torrentInfo.name,
      hash: torrentInfo.infoHash,
      slug: torrentInfo.name,
      filename: file.originalname,
      validated: false,
      blocked: false,
      completed: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      description: information.description,
      mediainfo: information.mediainfo,
      size: file.size,
    });
    await this.torrentRepository.save(torrent);
  }
}
