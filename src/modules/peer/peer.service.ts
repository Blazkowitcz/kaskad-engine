import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Peer } from './peer.entity';
import { AddPeerDto } from './dtos/peer-add.dto';
import { User } from '../user/user.entity';

@Injectable()
export class PeerService {
  constructor(
    @InjectRepository(Peer) private readonly peerRepository: Repository<Peer>,
  ) {}

  /**
   * Add or update peer
   * @param peerDto {AddPeerDto}
   * @param user {User}
   * @returns {Peer}
   */
  async addPeerOrUpdate(peerDto: AddPeerDto, user: User): Promise<Peer> {
    let peer: Peer | null = await this.peerRepository.findOne({
      where: {
        hash: peerDto.hash,
        user: { id: user.id },
        ip: peerDto.ip,
        port: peerDto.port,
      },
    });

    if (!peer) {
      peer = this.peerRepository.create({
        hash: peerDto.hash,
        user: { id: user.id },
        ip: peerDto.ip,
        port: peerDto.port,
      });
    }
    peer.date = new Date();
    return this.peerRepository.save(peer);
  }

  /**
   * Remove peer
   * @param peerId {String}
   * @returns {Boolean}
   */
  async removePeer(peerId: string): Promise<boolean> {
    await this.peerRepository.delete(peerId);
    return true;
  }
}
