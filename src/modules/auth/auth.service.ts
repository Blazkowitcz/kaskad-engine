import { Injectable, NotAcceptableException } from '@nestjs/common';
import { User } from '../user/user.entity';
import { AddUserDto } from '../user/dtos/user-add.dto';
import { UserService } from '../user/user.service';
import { compare, hash } from 'bcrypt';
import { randomBytes } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { translate } from '../../helpers/i18n.helper';
import { encrypt } from '../../helpers/crypto.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Sign-up new user
   * @param userDto {AddUserDto}
   * @returns {Boolean}
   */
  async signup(userDto: AddUserDto): Promise<boolean> {
    const user: User | null = await this.userService.getUserByUsername(
      userDto?.username,
    );
    if (user) {
      throw new NotAcceptableException(
        translate('auth.failures.usernameAlreadyExist'),
      );
    }
    userDto.password = await hash(userDto.password, 10);
    userDto.passkey = randomBytes(16).toString('hex');
    await this.userService.addUser(userDto);
    return true;
  }

  /**
   * Sign-in user
   * @param userDto {AddUserDto}
   * @returns {String} JWT Token
   */
  async signin(userDto: AddUserDto): Promise<string> {
    const user = await this.userService.getUserByUsername(userDto.username, {
      password: true,
      passkey: true,
      email: true,
    });
    console.log(user);
    if (!user || !(await compare(userDto.password, user.password))) {
      throw new NotAcceptableException(
        translate('auth.failures.wrongUsernameOrPassword'),
      );
    }

    return this.jwtService.sign({
      id: user.id,
      username: user.username,
      passkey: encrypt(user.passkey),
      groups: user.groups.map((group) => {
        return group;
      }),
    });
  }
}
