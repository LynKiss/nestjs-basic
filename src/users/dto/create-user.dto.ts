import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail(
    {},
    {
      message: 'Title is too short',
    },
  )
  @IsNotEmpty({
    message: 'Title is too short',
  })
  email: string;

  @IsNotEmpty({
    message: 'Title is too short',
  })
  password: string;

  name: string;
  phone?: string;
  age?: number;
  address?: string;
}
