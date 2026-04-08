import { Controller, Post, Request, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';



@Controller()

export class AppController {

  @UseGuards(LocalAuthGuard)

  @Post('/login')

  handleLogin(@Request() req) {

    return req.user;

  }

}

