import {IsEmail, IsString} from 'class-validator';

export class AddUserDto {
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsEmail()
    email: string;

    @IsString()
    passkey?: string;
}