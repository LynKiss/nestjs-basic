import { Controller, Post, Request, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from './decorator/customize';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

}
