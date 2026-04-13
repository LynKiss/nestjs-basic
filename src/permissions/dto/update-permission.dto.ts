import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionDto } from './create-permission.dto';

// DTO update ke thua tu DTO create va bien moi field thanh optional.
export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}
