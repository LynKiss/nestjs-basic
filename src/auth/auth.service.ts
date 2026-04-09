import { Response } from 'express';



import ms = require('ms');



import { ConfigService } from '@nestjs/config';



import { UsersService } from '../users/users.service';



import { Injectable, UnauthorizedException } from '@nestjs/common';



import { JwtService } from '@nestjs/jwt';



import { IUser } from '../users/users.interface';



import { RegisterUserDto } from '../users/dto/create-user.dto';



import { StringValue } from 'ms';



import { RefreshTokenDto } from './dto/refresh-token.dto';



@Injectable()

export class AuthService {

  constructor(

    private usersService: UsersService,



    private jwtService: JwtService,



    private configService: ConfigService,

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



    return {

      ...result,



      // Chuan hoa _id thanh string som de cac buoc ky JWT va update DB on dinh hon.



      _id: user._id.toString(),

    };

  }



  // Gom chung payload de access token va refresh token luon mang cung danh tinh user.



  private buildTokenPayload(user: IUser) {

    const { name, email, role } = user;



    return {

      sub: 'token login',



      iss: 'from server',



      _id: user._id.toString(),



      name,



      email,



      role,

    };

  }



  private getRefreshTokenSecret() {

    return this.configService.get<string>('JWT_REFRESH_TOKEN') ?? '';

  }



  private getAccessTokenExpires() {

    return (

      (this.configService.get<string>('JWT__ACCESS_EXPIRED') as

        | StringValue

        | undefined) ?? '300s'

    );

  }



  private getRefreshTokenExpires() {

    return (

      (this.configService.get<string>('JWT_REFRESH_EXPIRED') as

        | StringValue

        | undefined) ?? '6000s'

    );

  }



  // jsonwebtoken nhan string nhu "300s", con FE thuong can seconds de hien thi countdown.



  private toExpiresInSeconds(duration: StringValue) {

    return Math.floor(ms(duration) / 1000);

  }



  // Cookie maxAge can tinh theo milliseconds, khac voi expires_in tra ve cho FE la seconds.



  private setRefreshTokenCookie(response: Response, refreshToken: string) {

    response.cookie('refresh_token', refreshToken, {

      httpOnly: true,

      sameSite: 'lax',

      maxAge: ms(this.getRefreshTokenExpires()),

    });

  }



  async login(user: IUser, response?: Response) {

    const _id = user._id.toString();



    const { name, email, role } = user;



    const payload = this.buildTokenPayload(user);



    const accessTokenExpiresIn = this.getAccessTokenExpires();



    const refresh_token = this.createRefreshToken(payload);



    if (response) {

      this.setRefreshTokenCookie(response, refresh_token);

    }



    await this.usersService.updateUserRefreshToken(_id, refresh_token);



    return {

      access_token: this.jwtService.sign(payload),



      refresh_token,



      access_token_expires_in: this.toExpiresInSeconds(accessTokenExpiresIn),



      refresh_token_expires_in: this.toExpiresInSeconds(

        this.getRefreshTokenExpires(),

      ),



      user: {

        _id,



        name,



        email,



        role,

      },

    };

  }



  async register(registerUserDto: RegisterUserDto) {

    return this.usersService.register(registerUserDto);

  }



  async refreshToken(refreshTokenDto: RefreshTokenDto) {

    const { refreshToken } = refreshTokenDto;



    if (!refreshToken) {

      throw new UnauthorizedException('Refresh token khong hop le');

    }



    const payload = this.jwtService.verify(refreshToken, {

      secret: this.getRefreshTokenSecret(),

    }) as IUser;



    const user = await this.usersService.findOneByIdForAuth(payload._id);



    if (!user || !user.refreshToken) {

      throw new UnauthorizedException('Refresh token khong hop le');

    }



    const isRefreshTokenValid = this.usersService.checkUserPassword(

      refreshToken,



      user.refreshToken,

    );



    if (!isRefreshTokenValid) {

      throw new UnauthorizedException('Refresh token khong hop le');

    }



    const currentUser = {

      _id: user._id.toString(),



      name: user.name,



      email: user.email,



      role: user.role,

    };



    return this.login(currentUser);

  }



  async logout(user: IUser) {

    await this.usersService.updateUserRefreshToken(user._id.toString(), null);



    return {

      success: true,

    };

  }



  createRefreshToken = (

    payload: ReturnType<AuthService['buildTokenPayload']>,

  ) => {

    const refresh_token = this.jwtService.sign(payload, {

      secret: this.getRefreshTokenSecret(),



      // Giữ nguyên string duration de tranh nham lan giữa seconds va milliseconds.



      expiresIn: this.getRefreshTokenExpires(),

    });



    return refresh_token;

  };

}
