import { IsNotEmpty, IsString } from 'class-validator';

// DTO tao permission.
// Moi permission gan voi 1 API cu the trong backend.
export class CreatePermissionDto {
  @IsString()
  @IsNotEmpty({
    message: 'Name khong duoc de trong',
  })
  name: string;

  @IsString()
  @IsNotEmpty({
    message: 'Api path khong duoc de trong',
  })
  apiPath: string;

  @IsString()
  @IsNotEmpty({
    message: 'Method khong duoc de trong',
  })
  method: string;

  @IsString()
  @IsNotEmpty({
    message: 'Module khong duoc de trong',
  })
  module: string;
}
