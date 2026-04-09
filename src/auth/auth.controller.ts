import { Body, Controller, Post, Request, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import {
  Public,
  ResponseMessage,
  User as CurrentUser,
} from '../decorator/customize';
import { RegisterUserDto } from '../users/dto/create-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { IUser } from '../users/users.interface';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  // Login la route public vi user chua co token o buoc nay.
  // LocalAuthGuard se kiem tra username/password, sau do moi goi login() de ky JWT.
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  @ResponseMessage("User Login")
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('/auth/refresh')
  @ResponseMessage('Get new access token by refresh token')
  refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @Public()
  @Post('/auth/register')
  @ResponseMessage('Register a new user')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('/auth/logout')
  @ResponseMessage('User Logout')
  logout(@CurrentUser() user: IUser) {
    return this.authService.logout(user);
  }

  // Route nay khong can gan JwtAuthGuard nua vi APP_GUARD da bao ve toan bo app.
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
