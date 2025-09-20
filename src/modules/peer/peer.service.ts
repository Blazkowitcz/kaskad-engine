import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Peer } from './peer.entity';
import { AddPeerDto } from './dtos/peer-add.dto';
import { User } from '../user/user.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LessThan } from 'typeorm';

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

  /**
   * Get peers from hash
   * @param hash {String}
   * @returns {Peer[]}
   */
  async getPeersFromHash(hash: string): Promise<Peer[]> {
    return await this.peerRepository.find({ where: { hash } });
  }

  /**
   * Remove peers older than 1 hour
   */
  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    const peers = await this.peerRepository.find({
      where: { date: LessThan(new Date(Date.now() - 60 * 60 * 1000)) },
    });
    for (const peer of peers) {
      await this.peerRepository.delete(peer.id);
    }
  }
}
