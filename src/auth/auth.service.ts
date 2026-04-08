import { UsersService } from '../users/users.service';

import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,

    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);

    const isPasswordValid = user
      ? this.usersService.checkUserPassword(pass, user.password)
      : false;

    console.log('[Auth] validateUser', {
      username,

      foundUser: !!user,

      isPasswordValid,
    });

    if (!user || !isPasswordValid) {
      return null;
    }

    const { password, ...result } = user.toObject();

    return result;
  }
  async login(user: any) {
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
