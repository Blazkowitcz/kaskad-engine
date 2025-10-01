import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { GroupService } from './group.service';
import { UserModule } from '../user/user.module';
import { GroupController } from './group.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Group]), UserModule, AuthModule],
  providers: [GroupService],
  controllers: [GroupController],
})
export class GroupModule {}
