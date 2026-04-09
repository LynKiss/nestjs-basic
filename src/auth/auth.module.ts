import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/local.strategy';
import { JwtStrategy } from './passport/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StringValue } from 'ms';
import ms = require('ms');
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const jwtExpires =
          (configService.get<string>('JWT__ACCESS_EXPIRED') as
            | StringValue
            | undefined) ?? '60s';

        return {
          secret: configService.get<string>('JWT__ACCESS_SECRET') ?? '',
          signOptions: {
            // ms() tra ve mili-giay, trong khi expiresIn dang number lai duoc hieu la giay.
            // Vi vay can doi tu ms sang seconds de tranh token song lau hon mong doi.
            expiresIn: Math.floor(ms(jwtExpires) / 1000),
          },
        };
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
