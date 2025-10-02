import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { IsAuthGuard } from '../../common/guards/auth.guard';
import { IsGroupGuard } from '../../common/guards/group.guard';
import type { UserRequest } from '../user/user.entity';
import { GroupService } from './group.service';
import { AddUserGroupDto } from './dtos/user_group-add.dto';
import { Group } from './group.decorator';
import { GROUPS } from '../../constants';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  /**
   * Associate a group to a user
   * @param userRequest {UserRequest}
   * @param userGroup {AddUserGroupDto}
   * @returns {Boolean}
   */
  @Post('/addUserToGroup')
  @UseGuards(IsAuthGuard, IsGroupGuard)
  @Group(GROUPS.ADMINISTRATOR)
  async addUserToGroup(
    @Req() userRequest: UserRequest,
    @Body() userGroup: AddUserGroupDto,
  ): Promise<boolean> {
    return await this.groupService.addUserToGroup(userRequest, userGroup);
  }

  /**
   * Remove user from group
   * @param userRequest {UserRequest}
   * @param userGroup {AddUserGroupDto}
   * @returns {Boolean}
   */
  @Post('/removeUserFromGroup')
  @UseGuards(IsAuthGuard)
  async removeUserFromGroup(
    @Req() userRequest: UserRequest,
    @Body() userGroup: AddUserGroupDto,
  ): Promise<boolean> {
    return await this.groupService.removeUserFromGroup(userRequest, userGroup);
  }
}
