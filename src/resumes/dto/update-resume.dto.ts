import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { RESUME_STATUS } from './create-resume.dto';

// DTO update resume trong bai hoc chu yeu dung de doi trang thai resume.
// Body PATCH chi can gui status moi.
export class UpdateResumeDto {
  @IsString()
  @IsIn(RESUME_STATUS, {
    message: 'Status phai thuoc PENDING/REVIEWING/APPROVED/REJECTED',
  })
  @IsNotEmpty({
    message: 'Status khong duoc de trong',
  })
  status: string;
}
