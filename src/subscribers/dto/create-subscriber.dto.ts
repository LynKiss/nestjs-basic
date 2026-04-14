import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

// DTO tao subscriber moi.
// Subscriber la nguoi dang ky nhan thong bao/ban tin theo skill.
export class CreateSubscriberDto {
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

  @IsString()
  @IsNotEmpty({
    message: 'Name khong duoc de trong',
  })
  name: string;

  @IsArray({
    message: 'Skills phai la mang',
  })
  skills: string[];
}
