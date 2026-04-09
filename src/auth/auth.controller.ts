import { Controller, Post, Request, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from '../decorator/customize';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  // Login la route public vi user chua co token o buoc nay.
  // LocalAuthGuard se kiem tra username/password, sau do moi goi login() de ky JWT.
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  // Route nay khong can gan JwtAuthGuard nua vi APP_GUARD da bao ve toan bo app.
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
