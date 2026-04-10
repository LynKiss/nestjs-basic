import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

// DTO con dung de validate object company long ben trong request tao job.
class CompanyDto {
  // _id bat buoc phai la Mongo ObjectId hop le.
  @IsMongoId({
    message: 'Company id khong dung dinh dang',
  })
  @IsNotEmpty({
    message: 'Company id khong duoc de trong',
  })
  _id: string;

  // Ten cong ty di kem de luu snapshot hien thi nhanh.
  @IsString()
  @IsNotEmpty({
    message: 'Ten cong ty khong duoc de trong',
  })
  name: string;

  // Logo cua cong ty da upload truoc do, frontend chi can gui lai ten file.
  @IsOptional()
  @IsString()
  logo?: string;
}

// DTO tao job.
// ValidationPipe trong main.ts se dua vao class nay de kiem tra va transform du lieu request.
export class CreateJobDto {
  // Ten vi tri tuyen dung.
  @IsString()
  @IsNotEmpty({
    message: 'Ten job khong duoc de trong',
  })
  name: string;

  // Skills phai la mang va khong duoc rong.
  // Moi phan tu trong mang deu phai la string.
  @IsArray({
    message: 'Skills phai la mang',
  })
  @ArrayNotEmpty({
    message: 'Skills khong duoc de trong',
  })
  @IsString({
    each: true,
    message: 'Moi skill phai la chuoi',
  })
  skills: string[];

  // Company la object nested nen can ValidateNested + Type de class-transformer xu ly dung.
  @IsNotEmpty({
    message: 'Company khong duoc de trong',
  })
  @ValidateNested()
  @Type(() => CompanyDto)
  company: CompanyDto;

  // Dia diem lam viec.
  @IsString()
  @IsNotEmpty({
    message: 'Dia diem khong duoc de trong',
  })
  location: string;

  // Chuyen gia tri tu request thanh number truoc khi validate.
  @Type(() => Number)
  @IsNumber(
    {},
    {
      message: 'Salary phai la so',
    },
  )
  @IsNotEmpty({
    message: 'Salary khong duoc de trong',
  })
  salary: number;

  // So luong can tuyen, cung duoc ep kieu ve number.
  @Type(() => Number)
  @IsNumber(
    {},
    {
      message: 'Quantity phai la so',
    },
  )
  @IsNotEmpty({
    message: 'Quantity khong duoc de trong',
  })
  quantity: number;

  // Cap do yeu cau cua job.
  @IsString()
  @IsNotEmpty({
    message: 'Level khong duoc de trong',
  })
  level: string;

  // Noi dung mo ta cong viec.
  @IsString()
  @IsNotEmpty({
    message: 'Description khong duoc de trong',
  })
  description: string;

  // class-transformer chuyen chuoi ngay thang thanh doi tuong Date truoc khi validate.
  @Type(() => Date)
  @IsDate({
    message: 'Start date khong dung dinh dang',
  })
  @IsNotEmpty({
    message: 'Start date khong duoc de trong',
  })
  startDate: Date;

  // Ngay ket thuc nhan ho so.
  @Type(() => Date)
  @IsDate({
    message: 'End date khong dung dinh dang',
  })
  @IsNotEmpty({
    message: 'End date khong duoc de trong',
  })
  endDate: Date;

  // isActive la field tuy chon.
  // Transform de ho tro ca boolean that va string 'true'/'false' tu request body/query.
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return value;
  })
  @IsBoolean({
    message: 'IsActive phai la boolean',
  })
  isActive?: boolean;
}
