import { Injectable, StreamableFile } from '@nestjs/common';
import { PeerService } from '../peer/peer.service';
import { Request } from 'express';
import { Bencode } from 'bencode-ts';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { Peer } from '../peer/peer.entity';
import { env } from 'node:process';

@Injectable()
export class AnnouncerService {
  constructor(
    private readonly userService: UserService,
    private readonly peerService: PeerService,
  ) {}

  async announce(request: Request, passkey: string): Promise<StreamableFile> {
    const user: User | null = await this.userService.getUserByPasskey(passkey);

    if (!user) {
      return new StreamableFile(
        Bencode.encode({ 'failure reason': 'User does not exist' }),
        { type: 'text/plain', disposition: 'inline' },
      );
    }

    if (user.getRatio() < Number(env.MIN_RATIO)) {
      return new StreamableFile(
        Bencode.encode({ 'failure reason': 'Not enough ratio' }),
        { type: 'text/plain', disposition: 'inline' },
      );
    }

    const peers = await this.updateAndGetPeers(user, request);
    await this.updateUserInformation(user, request);

    return new StreamableFile(
      Bencode.encode({
        interval: 2700,
        min_interval: 1800,
        tracker_id: '127.0.0.1:3000',
        complete: 0,
        peers: peers.map((peer) => ({ ip: peer.ip, port: peer.port })),
      }),
      { type: 'text/plain', disposition: 'inline' },
    );
  }

  /**
   * Update downloaded and uploaded value for the current user
   * @param user {User}
   * @param request {Request}
   * @private
   */
  private async updateUserInformation(
    user: User,
    request: Request,
  ): Promise<void> {
    user.downloaded += Number(request.query.downloaded);
    user.uploaded += Number(request.query.uploaded);
    await this.userService.updateUser(user);
  }

  /**
   * Update or create peer and return list of peers related to current torrent
   * @param user {User}
   * @param request {Request}
   * @private
   * @returns {Peer[]}
   */
  private async updateAndGetPeers(
    user: User,
    request: Request,
  ): Promise<Peer[]> {
    const hashBuffer = Buffer.from(
      (request.query.info_hash as string) || '',
      'binary',
    );
    await this.peerService.addPeerOrUpdate(
      {
        ip: request.headers?.host?.substring(
          0,
          request.headers.host.indexOf(':'),
        ),
        port: Number.parseInt(request.query.port as string),
        hash: hashBuffer.toString('hex'),
      },
      user,
    );
    return await this.peerService.getPeersFromHash(hashBuffer.toString('hex'));
  }
}
