import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Group } from './group.entity';
import { Repository } from 'typeorm';
import { UserRequest } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AddUserGroupDto } from './dtos/user_group-add.dto';

@Injectable()
export class GroupService implements OnModuleInit {
  private groups: Group[] = [];
  private readonly logger = new Logger(`GroupCache`);

  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    private readonly userService: UserService,
  ) {}

  async onModuleInit() {
    this.groups = await this.groupRepository.find();
    this.logger.log(`Group cache loaded with ${this.groups.length} entries`);
  }

  /**
   * Get groups stored in cache
   */
  getGroups(): Group[] {
    return this.groups;
  }

  /**
   * Associate a group to a user
   * @param userRequest {UserRequest}
   * @param userGroup {AddUserGroupDto}
   * @returns {Boolean}
   */
  async addUserToGroup(
    userRequest: UserRequest,
    userGroup: AddUserGroupDto,
  ): Promise<boolean> {
    const [user, group] = await Promise.all([
      this.userService.getUserById(userGroup.userId),
      this.getGroupById(userGroup.groupId),
    ]);

    const hasPermission = userRequest.user.groups.some(
      (g) => g.priority < group.priority && g.priority > 0,
    );

    if (!hasPermission) return false;

    user.groups = user.groups ? [...user.groups, group] : [group];
    await this.userService.editUser(user);
    return true;
  }

  /**
   * Remove user from group
   * @param userRequest {UserRequest}
   * @param userGroup {AddUserGroupDto}
   * @returns {Boolean}
   */
  async removeUserFromGroup(
    userRequest: UserRequest,
    userGroup: AddUserGroupDto,
  ): Promise<boolean> {
    const [user, group] = await Promise.all([
      this.userService.getUserById(userGroup.userId),
      this.getGroupById(userGroup.groupId),
    ]);

    const hasPermission = userRequest.user.groups.some(
      (g) => g.priority < group.priority && g.priority > 0,
    );

    console.log(hasPermission);

    if (!hasPermission) return false;

    user.groups = user.groups.filter((g) => g.code !== group.code);
    await this.userService.editUser(user);
    return true;
  }

  /**
   * Get group by its ID
   * @param groupId {String}
   * returns {Group}
   */
  async getGroupById(groupId: string): Promise<Group> {
    return await this.groupRepository.findOneOrFail({ where: { id: groupId } });
  }
}
