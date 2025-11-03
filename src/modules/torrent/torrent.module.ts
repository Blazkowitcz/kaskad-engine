import { Module } from '@nestjs/common';
import { TorrentController } from './torrent.controller';
import { Torrent } from './torrent.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TorrentService } from './torrent.service';
import { AuthModule } from '../auth/auth.module';
import { SubcategoryModule } from '../subcategory/subcategory.module';
import { LanguageModule } from '../language/language.module';
import { PeerModule } from '../peer/peer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Torrent]),
    AuthModule,
    SubcategoryModule,
    LanguageModule,
    PeerModule,
  ],
  controllers: [TorrentController],
  providers: [TorrentService],
  exports: [TorrentService],
})
export class TorrentModule {}
