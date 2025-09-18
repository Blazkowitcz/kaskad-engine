import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PeerService } from '../peer/peer.service';
import { Request } from 'express';
import { Bencode } from 'bencode-ts';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class AnnouncerService {
  constructor(
    private readonly userService: UserService,
    private readonly peerService: PeerService,
  ) {}

  async announce(request: Request, passkey: string): Promise<Buffer> {
    const user: User | null = await this.userService.getUserByPasskey(passkey);
    if (!user) {
      throw new NotAcceptableException('User dont exist');
    }
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
    const data = {
      interval: 2700,
      min_interval: 1800,
      tracker_id: '127.0.0.1:3000',
      complete: false,
      peers: [],
    };
    return Bencode.encode(data);
  }
}
