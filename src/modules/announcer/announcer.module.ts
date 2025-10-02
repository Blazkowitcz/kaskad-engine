import { Module } from '@nestjs/common';
import { AnnouncerController } from './announcer.controller';
import { AnnouncerService } from './announcer.service';
import { UserModule } from '../user/user.module';
import { PeerModule } from '../peer/peer.module';
import { TorrentModule } from '../torrent/torrent.module';

@Module({
  controllers: [AnnouncerController],
  providers: [AnnouncerService],
  imports: [PeerModule, UserModule, TorrentModule],
})
export class AnnouncerModule {}
