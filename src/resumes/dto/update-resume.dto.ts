import { PartialType } from '@nestjs/mapped-types';
import { CreateResumeDto } from './create-resume.dto';

// DTO update resume, ke thua tu DTO create va bien tat ca field thanh optional.
export class UpdateResumeDto extends PartialType(CreateResumeDto) {}
