import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

const RESUME_STATUS = ['PENDING', 'REVIEWING', 'APPROVED', 'REJECTED'] as const;

// DTO tao resume theo dung flow bai hoc.
// FE chi can gui thong tin lien quan den file va ban ghi ung tuyen.
// email, userId, status, history, createdBy se do backend tu lay tu JWT.
export class CreateResumeDto {
  // Ten file CV hoac url file da upload thanh cong.
  @IsString()
  @IsNotEmpty({
    message: 'Url khong duoc de trong',
  })
  url: string;

  // Company id ma user dang ung tuyen vao.
  @IsMongoId({
    message: 'Company id khong dung dinh dang',
  })
  @IsNotEmpty({
    message: 'Company id khong duoc de trong',
  })
  companyId: string;

  // Job id ma user muon apply.
  @IsMongoId({
    message: 'Job id khong dung dinh dang',
  })
  @IsNotEmpty({
    message: 'Job id khong duoc de trong',
  })
  jobId: string;
}

export { RESUME_STATUS };
