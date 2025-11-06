import { Controller, Post, Body, Get, Req, Res } from '@nestjs/common';
import { AddUserDto } from '../user/dtos/user-add.dto';
import { AuthService } from './auth.service';
import { type Request, type Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Sign up new user
   * @param user {AddUserDto}
   * @returns {boolean}
   */
  @Post('signup')
  async signup(@Body() user: AddUserDto): Promise<boolean> {
    return this.authService.signup(user);
  }

  /**
   * Sign in user
   * @param res {Response}
   * @param user {AddUserDto}
   * @returns {object}
   */
  @Post('signin')
  async signin(
    @Res() res: Response,
    @Body() user: AddUserDto,
  ): Promise<Response<{ token: boolean }>> {
    console.log(user);
    const token = await this.authService.signin(user);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return res.status(200).json({ connected: true });
  }

  /**
   * Check if user is connected
   * TODO : Add token check to really validate if user is still connected
   * @param res {Response}
   * @param request {Request}
   * @returns {object}
   */
  @Get('check')
  check(@Res() res: Response, @Req() request: Request) {
    return res.status(200).json({ connected: true });
  }
}
