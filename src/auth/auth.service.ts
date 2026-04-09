import { UsersService } from '../users/users.service';

import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { IUser } from '../users/users.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,

    private jwtService: JwtService,
  ) { }

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
  async login(user: IUser) {
    const { _id, name, email, role } = user;
    const payload = {
      sub: 'token login',
      iss: 'from server',
      _id,
      name,
      email,
      role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      _id,
      name,
      email,
      role,
    };
  }
}
