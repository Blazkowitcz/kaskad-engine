import { IsString } from 'class-validator';

export class AddUserGroupDto {
  @IsString()
  userId: string;

  @IsString()
  groupId: string;
}
