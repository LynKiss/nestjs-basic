import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDto } from './create-job.dto';

// DTO update ke thua tu DTO create nhung tat ca field deu tro thanh optional.
export class UpdateJobDto extends PartialType(CreateJobDto) {}
