import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Peer } from './peer.entity';
import { PeerService } from './peer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Peer])],
  providers: [PeerService],
  exports: [PeerService],
})
export class PeerModule {}
