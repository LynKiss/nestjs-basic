import { Transform, Type } from 'class-transformer';
import mongoose from 'mongoose';
import {
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

// DTO tao role gom thong tin mo ta va danh sach permission id.
export class CreateRoleDto {
  @IsString()
  @IsNotEmpty({
    message: 'Name khong duoc de trong',
  })
  name: string;

  @IsString()
  @IsNotEmpty({
    message: 'Description khong duoc de trong',
  })
  description: string;

  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return value;
  })
  @IsNotEmpty({
    message: 'IsActive khong duoc de trong',
  })
  @IsBoolean({
    message: 'IsActive phai la boolean',
  })
  isActive: boolean;

  // Moi phan tu trong mang permissions phai la ObjectId hop le.
  @IsNotEmpty({
    message: 'Permissions khong duoc de trong',
  })
  @IsArray({
    message: 'Permissions phai la mang',
  })
  @ArrayUnique({
    message: 'Permissions khong duoc trung lap',
  })
  @Type(() => String)
  @IsMongoId({
    each: true,
    message: 'Moi permission id phai dung dinh dang MongoId',
  })
  permissions: mongoose.Schema.Types.ObjectId[];
}
