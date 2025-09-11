import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AddUserDto } from './dtos/user-add.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Add new user
   * @param dto {AddUserDto}
   * @returns {Boolean}
   */
  async addUser(dto: AddUserDto): Promise<boolean> {
    let user = await this.getUserByUsername(dto.username);
    if (!user) {
      user = this.userRepository.create(dto);
      await this.userRepository.save(user);
      return true;
    }
    throw new HttpException(
      'User already exists',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  /**
   * Get user by its username
   * @param username
   * @returns {User | null}
   */
  async getUserByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { username } });
  }
}
