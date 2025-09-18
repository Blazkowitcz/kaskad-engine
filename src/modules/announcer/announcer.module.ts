import { Module } from '@nestjs/common';
import { AnnouncerController } from './announcer.controller';
import { AnnouncerService } from './announcer.service';
import { UserModule } from '../user/user.module';
import { PeerModule } from '../peer/peer.module';

@Module({
  controllers: [AnnouncerController],
  providers: [AnnouncerService],
  imports: [PeerModule, UserModule],
})
export class AnnouncerModule {}
