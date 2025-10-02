import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GroupService } from '../../modules/group/group.service';
import { GROUP_KEY } from '../../modules/group/group.decorator';
import { Group } from '../../modules/group/group.entity';
import { Request } from 'express';
import { User } from '../../modules/user/user.entity';

@Injectable()
export class IsGroupGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly groupService: GroupService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request['user'] as User;

    const requiredGroup = this.reflector.get<string>(
      GROUP_KEY,
      context.getHandler(),
    );
    if (!requiredGroup) return true;

    const group = this.groupService
      .getGroups()
      .find((g) => g.code === requiredGroup);
    if (!group) return true;

    const hasAccess = user.groups?.some(
      (g: Group) => g.priority <= group.priority && g.priority > 0,
    );

    if (!hasAccess) {
      throw new ForbiddenException(
        `You need at least group "${requiredGroup}" to access this resource.`,
      );
    }

    return true;
  }
}
