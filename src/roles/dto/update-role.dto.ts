import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';

// DTO update ke thua CreateRoleDto de dung lai validation.
export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
