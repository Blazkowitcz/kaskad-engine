import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User, UserFields } from './user.entity';
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
   * @param fields
   * @returns {User | null}
   */
  async getUserByUsername(
    username: string,
    fields: UserFields = {},
  ): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { username },
      select: { id: true, username: true, ...fields },
    });
  }

  /**
   * Get user by its passkey
   * @param passkey {String}
   */
  async getUserByPasskey(passkey: string) {
    return await this.userRepository.findOne({ where: { passkey } });
  }

  /**
   * Update user information
   * @param user {User}
   * @returns {User}
   */
  async updateUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
