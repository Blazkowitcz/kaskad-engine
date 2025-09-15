import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Torrent } from './torrent.entity';
import { AddTorrentDto } from './dtos/torrent-add.dto';
import ParseTorrentFile from 'parse-torrent-file';
import { kebabCase } from 'lodash';
import { UserRequest } from '../user/user.entity';
import { SubcategoryService } from '../subcategory/subcategory.service';

@Injectable()
export class TorrentService {
  constructor(
    @InjectRepository(Torrent)
    private readonly torrentRepository: Repository<Torrent>,
    private readonly subcategoryService: SubcategoryService,
  ) {}

  /**
   * Add new torrent
   * @param file {Express.Multer.File}
   * @param name {String}
   * @param description {String}
   * @param mediainfo {String}
   * @param subcategoryId {String}
   * @param user {UserRequest}
   * @returns {Torrent}
   */
  async addTorrent(
    file: Express.Multer.File,
    { name, description, mediainfo, subcategory: subcategoryId }: AddTorrentDto,
    { user }: UserRequest,
  ): Promise<Torrent> {
    const subcategory =
      await this.subcategoryService.getSubcategoryById(subcategoryId);
    if (!subcategory) throw new Error('Subcategory not found'); // ou NotFoundException

    const { infoHash } = ParseTorrentFile(file.buffer);

    const torrent = await this.torrentRepository.findOne({
      where: { hash: infoHash },
    });

    if (torrent) throw new NotAcceptableException('Torrent already exists');

    return this.torrentRepository.save(
      this.torrentRepository.create({
        name,
        description,
        mediainfo,
        subcategory,
        hash: infoHash,
        slug: kebabCase(name),
        filename: file.originalname,
        validated: false,
        blocked: false,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        size: file.size,
        user,
      }),
    );
  }

  async getLastTorrents() {
    return await this.torrentRepository.find({
      order: { createdAt: 'DESC' },
      take: 50,
      relations: ['subcategory', 'user'],
    });
  }
}
