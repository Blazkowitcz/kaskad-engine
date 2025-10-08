import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { AddUserDto } from '../user/dtos/user-add.dto';
import { AuthService } from './auth.service';
import express from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Sign up new user
   * @param user {AddUserDto}
   */
  @Post('signup')
  async signup(@Body() user: AddUserDto): Promise<boolean> {
    return this.authService.signup(user);
  }

  @Post('signin')
  async signin(@Body() user: AddUserDto): Promise<string> {
    console.log(user);
    return this.authService.signin(user);
  }

  @Get('check')
  check(@Req() request: express.Request) {
    return this.authService.check(request);
  }
}
