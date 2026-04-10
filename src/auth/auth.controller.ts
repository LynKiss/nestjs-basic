import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';

import { LocalAuthGuard } from './local-auth.guard';

import {

  Public,

  ResponseMessage,

  User as CurrentUser,

} from '../decorator/customize';

import { RegisterUserDto } from '../users/dto/create-user.dto';

import { IUser } from '../users/users.interface';
import { Request, Response } from 'express';



@Controller()

export class AuthController {

  constructor(private authService: AuthService) { }



  // Login la route public vi user chua co token o buoc nay.

  // LocalAuthGuard se kiem tra username/password, sau do moi goi login() de ky JWT.

  @Public()

  @UseGuards(LocalAuthGuard)

  @Post('/auth/login')

  @ResponseMessage('User Login')

  handleLogin(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {

    return this.authService.login(req.user as IUser, response);

  }



  @Public()

  @Get('/auth/refresh')

  @ResponseMessage('Get new access token by refresh token')

  refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = req.cookies?.refresh_token;

    return this.authService.refreshToken(refreshToken, response);

  }



  @Public()

  @Post('/auth/register')

  @ResponseMessage('Register a new user')

  register(@Body() registerUserDto: RegisterUserDto) {

    return this.authService.register(registerUserDto);

  }



  @Post('/auth/logout')

  @ResponseMessage('User Logout')

  logout(
    @CurrentUser() user: IUser,
    @Res({ passthrough: true }) response: Response,
  ) {

    return this.authService.logout(user, response);

  }



  // Route nay dung de FE goi lai thong tin account hien tai sau khi F5.

  @Get('/auth/account')

  @ResponseMessage('Get user information')

  getAccount(@Req() req: Request) {

    return {

      user: req.user,

    };

  }

}
