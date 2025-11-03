import { Injectable, StreamableFile } from '@nestjs/common';
import { PeerService } from '../peer/peer.service';
import { Request } from 'express';
import { Bencode } from 'bencode-ts';
import { UserService } from '../user/user.service';
import { TorrentService } from '../torrent/torrent.service';
import { User } from '../user/user.entity';
import { Peer } from '../peer/peer.entity';
import { env } from 'node:process';
import { translate } from '../../helpers/i18n.helper';
import { isHex, getInfoHashHexFromUrl } from '../../helpers/string.helper';

@Injectable()
export class AnnouncerService {
  constructor(
    private readonly userService: UserService,
    private readonly peerService: PeerService,
    private readonly torrentService: TorrentService,
  ) {}

  /**
   * Respond to announces from torrent clients
   * @param request {Request}
   * @param passkey {string}
   */
  async announce(request: Request, passkey: string): Promise<StreamableFile> {
    // Get hash to hex format
    const hash: string = isHex(request.query.info_hash as string)
      ? (request.query.info_hash as string)
      : (getInfoHashHexFromUrl(request.originalUrl) ?? '');

    // Get torrent from hash
    const torrent = await this.torrentService.getTorrentFromHash(hash);

    // Get user by its passkey
    const user: User | null = await this.userService.getUserByPasskey(passkey);

    if (!user) {
      return new StreamableFile(
        Bencode.encode({
          'failure reason': translate('announcer.failures.userDoesNotExist'),
        }),
        { type: 'text/plain', disposition: 'inline' },
      );
    }

    if (
      user.getRatio() < Number(env.MIN_RATIO) &&
      !!env.FULL_FREELEECH &&
      Number(request.query.left) > 0 &&
      !torrent.isFreeleech
    ) {
      return new StreamableFile(
        Bencode.encode({
          'failure reason': translate('announcer.failures.notEnoughRatio'),
        }),
        { type: 'text/plain', disposition: 'inline' },
      );
    }

    // Update peers list and return new peers list related to torrent
    const peers = await this.updateAndGetPeers(user, request);
    await this.updateUserInformation(user, request);

    // Return Bencode streamableFile to torrent client
    return new StreamableFile(
      Bencode.encode({
        interval: Number(env.INTERVAL),
        min_interval: Number(env.MIN_INTERVAL),
        tracker_id: env.TRACKER_ADDRESS,
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
    const hash: string = isHex(request.query.info_hash as string)
      ? (request.query.info_hash as string)
      : (getInfoHashHexFromUrl(request.originalUrl) ?? '');
    await this.peerService.addPeerOrUpdate(
      {
        ip: request.headers?.host?.substring(
          0,
          request.headers.host.indexOf(':'),
        ),
        port: Number.parseInt(request.query.port as string),
        hash: hash,
      },
      user,
    );
    return await this.peerService.getPeersFromHash(hash);
  }
}
