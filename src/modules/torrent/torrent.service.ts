import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  NotAcceptableException,
  StreamableFile,
} from '@nestjs/common';
import { Repository, ILike, In } from 'typeorm';
import { Torrent, TorrentQuery, TorrentDetails } from './torrent.entity';
import { AddTorrentDto } from './dtos/torrent-add.dto';
import ParseTorrentFile from 'parse-torrent-file';
import { kebabCase } from 'lodash';
import { UserRequest } from '../user/user.entity';
import { SubcategoryService } from '../subcategory/subcategory.service';
import { writeFileSync } from 'fs';
import { randomBytes } from 'crypto';
import { readFileSync } from 'fs';
import { Bencode } from 'bencode-ts';
import * as process from 'node:process';

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
    if (!subcategory) throw new Error('Subcategory not found');

    const { infoHash } = ParseTorrentFile(file.buffer);

    let torrent = await this.torrentRepository.findOne({
      where: { hash: infoHash },
    });

    if (torrent) throw new NotAcceptableException('Torrent already exists');
    const filename = `${randomBytes(16).toString('hex')}.torrent`;
    torrent = await this.torrentRepository.save(
      this.torrentRepository.create({
        name,
        description,
        mediainfo,
        subcategory,
        hash: infoHash,
        slug: kebabCase(name),
        filename: filename,
        validated: false,
        blocked: false,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        size: file.size,
        user,
      }),
    );
    writeFileSync(`${process.env.FILE_LOCATION}${filename}`, file.buffer);
    return torrent;
  }

  /**
   * Get 20 last torrents
   * @returns {Torrent[]}
   */
  async getLastTorrents(): Promise<Torrent[]> {
    return await this.torrentRepository.find({
      order: { createdAt: 'DESC' },
      take: 20,
      relations: ['subcategory', 'user'],
      select: [
        'id',
        'name',
        'slug',
        'createdAt',
        'size',
        'completed',
        'subcategory',
      ],
    });
  }

  /**
   * Get 20 best torrents
   * @returns {Torrent[]}
   */
  async getBestTorrents(): Promise<Torrent[]> {
    return await this.torrentRepository.find({
      order: { completed: 'DESC' },
      take: 20,
      relations: ['subcategory', 'user'],
      select: [
        'id',
        'name',
        'slug',
        'createdAt',
        'size',
        'completed',
        'subcategory',
      ],
    });
  }

  /**
   * Download torrent
   * @param torrentSlug {String}
   * @param userRequest
   * @returns {StreamableFile}
   */
  async downloadTorrent(
    torrentSlug: string,
    userRequest: UserRequest,
  ): Promise<StreamableFile> {
    const torrent: Torrent | null = await this.torrentRepository.findOne({
      where: { slug: torrentSlug },
    });

    if (!torrent) {
      throw new NotAcceptableException('Torrent not found');
    }

    const torrentFile = ParseTorrentFile(
      readFileSync(`${process.env.FILE_LOCATION}${torrent?.filename}`),
    );

    if (torrentFile.announce && torrentFile.announce.length > 0) {
      torrentFile.announce[0] = `${process.env.TRACKER_ADDRESS}/announce/${userRequest.user.passkey}`;
      torrentFile['announce-list'] = [
        [`${process.env.TRACKER_ADDRESS}/announce/${userRequest.user.passkey}`],
      ];
    }
    torrentFile.createdBy = 'Kaskad Engine';
    return new StreamableFile(Bencode.encode(torrentFile), {
      disposition: `attachment; filename="${torrent.name}".torrent`,
    });
  }

  async searchTorrents(query: TorrentQuery): Promise<Torrent[]> {
    const search = {};
    for (const [key, value] of Object.entries(query) as [
      keyof TorrentQuery,
      string,
    ][]) {
      switch (key) {
        case 'name':
          search['name'] = ILike(`%${value}%`);
          break;
        case 'description':
          search['description'] = ILike(`%${value}%`);
          break;
        case 'categories':
          search['subcategory'] = {
            category: { slug: In(value.split(',')) },
          };
          break;
        case 'subcategories':
          search['subcategory'] = {
            slug: In(value.split(',')),
          };
          break;
        case 'author':
          search['user'] = {
            username: value,
          };
          break;
      }
    }

    return await this.torrentRepository.find({
      where: search,
      relations: ['subcategory', 'subcategory.category', 'user'],
    });
  }

  /**
   * Get torrent details from slug
   * @param slug {String}
   * @returns {Torrent}
   */
  async getTorrentDetails(slug: string): Promise<TorrentDetails> {
    const torrent: Torrent | null = await this.torrentRepository.findOne({
      where: { slug: slug },
    });
    if (!torrent) {
      throw new NotAcceptableException('Torrent not found');
    }

    return { ...torrent, peers: [] };
  }
}
