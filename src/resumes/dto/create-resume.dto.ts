import { Type } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

const RESUME_STATUS = ['PENDING', 'REVIEWING', 'APPROVED', 'REJECTED'] as const;

class UpdatedByDto {
  @IsMongoId({
    message: 'UpdatedBy id khong dung dinh dang',
  })
  @IsNotEmpty({
    message: 'UpdatedBy id khong duoc de trong',
  })
  _id: string;

  @IsEmail(
    {},
    {
      message: 'UpdatedBy email khong dung dinh dang',
    },
  )
  @IsNotEmpty({
    message: 'UpdatedBy email khong duoc de trong',
  })
  email: string;
}

class ResumeHistoryDto {
  @IsString()
  @IsIn(RESUME_STATUS, {
    message: 'History status phai thuoc PENDING/REVIEWING/APPROVED/REJECTED',
  })
  status: string;

  @IsOptional()
  updatedAt?: Date;

  @ValidateNested()
  @Type(() => UpdatedByDto)
  updatedBy: UpdatedByDto;
}

// DTO tao resume theo dung model bai hoc.
export class CreateResumeDto {
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

  @IsMongoId({
    message: 'User id khong dung dinh dang',
  })
  @IsNotEmpty({
    message: 'User id khong duoc de trong',
  })
  userId: string;

  @IsString()
  @IsNotEmpty({
    message: 'Url khong duoc de trong',
  })
  url: string;

  @IsString()
  @IsIn(RESUME_STATUS, {
    message: 'Status phai thuoc PENDING/REVIEWING/APPROVED/REJECTED',
  })
  @IsNotEmpty({
    message: 'Status khong duoc de trong',
  })
  status: string;

  @IsMongoId({
    message: 'Company id khong dung dinh dang',
  })
  @IsNotEmpty({
    message: 'Company id khong duoc de trong',
  })
  companyId: string;

  @IsMongoId({
    message: 'Job id khong dung dinh dang',
  })
  @IsNotEmpty({
    message: 'Job id khong duoc de trong',
  })
  jobId: string;

  // Cho phep gui history tu request, nhung service se tu chuan hoa neu can.
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ResumeHistoryDto)
  history?: ResumeHistoryDto[];
}

export { RESUME_STATUS };
