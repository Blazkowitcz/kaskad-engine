import {InjectRepository} from '@nestjs/typeorm';
import {Injectable, NotAcceptableException} from '@nestjs/common';
import {User} from '../user/user.entity';
import {AddUserDto} from "../user/dtos/user-add.dto";
import {UserService} from '../user/user.service';
import {compare, hash} from "bcrypt";
import {randomBytes} from "crypto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {
    }

    async signup(userDto: AddUserDto): Promise<boolean> {
        const user: User | null = await this.userService.getUserByUsername(userDto?.username);
        if (user) {
            throw new NotAcceptableException('Username already exists');
        }
        console.log(userDto)
        userDto.password = await hash(userDto.password, 10)
        userDto.passkey = randomBytes(16).toString("hex");
        await this.userService.addUser(userDto);
        return true
    }

    async signin(userDto: AddUserDto): Promise<string> {
        const user = await this.userService.getUserByUsername(userDto.username);
        if (!user || !await compare(userDto.password, user.password)) {
            throw new NotAcceptableException('Wrong Username or password');
        }

        return this.jwtService.sign({
            id: user.id,
            username: user.username,
            passkey: user.passkey,
        });
    }
}