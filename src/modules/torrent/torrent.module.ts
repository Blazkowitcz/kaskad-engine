import { Module } from '@nestjs/common';
import { TorrentController } from './torrent.controller';
import { Torrent } from './torrent.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TorrentService } from './torrent.service';

@Module({
  imports: [TypeOrmModule.forFeature([Torrent])],
  controllers: [TorrentController],
  providers: [TorrentService],
})
export class TorrentModule {}
