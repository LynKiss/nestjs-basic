import { UsersService } from '../users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUseName(username);
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
}
