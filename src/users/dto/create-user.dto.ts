import { Type } from 'class-transformer';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class Company {
  @IsMongoId({
    message: 'Company id khong dung dinh dang',
  })
  @IsNotEmpty({
    message: 'Company id khong duoc de trong',
  })
  _id: string;

  @IsString()
  @IsNotEmpty({
    message: 'Ten cong ty khong duoc de trong',
  })
  name: string;
}

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Name khong duoc de trong',
  })
  @IsString()
  name: string;

  @IsEmail(
    {},
    {
      message: 'Email khong dung dinh dang',
    },
  )
  @IsNotEmpty({
    message: 'Email khong duoc de trong',
  })
  email: string;

  @IsNotEmpty({
    message: 'Password khong duoc de trong',
  })
  @IsString()
  password: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty({
    message: 'Age khong duoc de trong',
  })
  age: number;

  @IsNotEmpty({
    message: 'Gender khong duoc de trong',
  })
  @IsString()
  gender: string;

  @IsNotEmpty({
    message: 'Address khong duoc de trong',
  })
  @IsString()
  address: string;

  @IsNotEmpty({
    message: 'Role khong duoc de trong',
  })
  @IsString()
  role: string;

  @IsNotEmpty({
    message: 'Company khong duoc de trong',
  })
  @ValidateNested()
  @Type(() => Company)
  company: Company;
}

export class RegisterUserDto {
  @IsNotEmpty({
    message: 'Name khong duoc de trong',
  })
  @IsString()
  name: string;

  @IsEmail(
    {},
    {
      message: 'Email khong dung dinh dang',
    },
  )
  @IsNotEmpty({
    message: 'Email khong duoc de trong',
  })
  email: string;

  @IsNotEmpty({
    message: 'Password khong duoc de trong',
  })
  @IsString()
  password: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty({
    message: 'Age khong duoc de trong',
  })
  age: number;

  @IsNotEmpty({
    message: 'Gender khong duoc de trong',
  })
  @IsString()
  gender: string;

  @IsNotEmpty({
    message: 'Address khong duoc de trong',
  })
  @IsString()
  address: string;
}
