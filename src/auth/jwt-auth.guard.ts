import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorator/customize';

@Injectable()
export class JwtAuthGuard extends AuthGuard(['jwt']) {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Doc metadata tu decorator @Public() o method hoac controller.
    // Neu route duoc danh dau public thi bo qua buoc kiem tra JWT.
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // Passport se tra user sau khi verify token thanh cong.
    // Neu khong co user hoac co loi thi chu dong tra ve 401 voi message de hieu hon.
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException('Ban chua dang nhap hoac token khong hop le')
      );
    }
    return user;
  }
}
