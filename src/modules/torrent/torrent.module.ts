import { Module } from '@nestjs/common';
import { TorrentController } from './torrent.controller';
import { Torrent } from './torrent.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TorrentService } from './torrent.service';
import { AuthModule } from '../auth/auth.module';
import { SubcategoryModule } from '../subcategory/subcategory.module';
import { LanguageModule } from '../language/language.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Torrent]),
    AuthModule,
    SubcategoryModule,
    LanguageModule,
  ],
  controllers: [TorrentController],
  providers: [TorrentService],
})
export class TorrentModule {}
