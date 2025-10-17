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
   */
  @Post('signup')
  async signup(@Body() user: AddUserDto): Promise<boolean> {
    return this.authService.signup(user);
  }

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

  @Get('check')
  check(@Res() res: Response, @Req() request: Request) {
    return res.status(200).json({ connected: true });
  }
}
