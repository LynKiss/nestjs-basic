import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import aqp from 'api-query-params';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from '../users/users.interface';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role, RoleDocument } from './schemas/role.schema';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name)
    private roleModel: SoftDeleteModel<RoleDocument>,
  ) {}

  private validateObjectId(id: string, field = 'role id') {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ${field}`);
    }
  }

  // Validate tung permission id truoc khi ghi DB de tra loi ro rang hon.
  private validatePermissionIds(
    permissionIds: Array<string | mongoose.Schema.Types.ObjectId> = [],
  ) {
    for (const permissionId of permissionIds) {
      this.validateObjectId(String(permissionId), 'permission id');
    }
  }

  async create(createRoleDto: CreateRoleDto, user: IUser) {
    this.validatePermissionIds(createRoleDto.permissions);

    const existingRole = await this.roleModel.findOne({
      name: createRoleDto.name,
    });

    if (existingRole) {
      throw new BadRequestException('Role da ton tai');
    }

    const role = await this.roleModel.create({
      ...createRoleDto,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });

    // Giong flow permissions, create role chi can tra ve id va thoi diem tao.
    return {
      _id: role._id,
      createdAt: role.createdAt,
    };
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    const page = currentPage > 0 ? currentPage : 1;
    const defaultLimit = limit > 0 ? limit : 10;
    const offset = (page - 1) * defaultLimit;
    const totalItems = (await this.roleModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    // Client co the truyen ?populate=permissions de lay full danh sach quyen cua role.
    const result = await this.roleModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      // @ts-ignore: api-query-params sort typing is broader than mongoose expects.
      .sort(sort as any)
      .populate(population)
      .select(projection as any)
      .exec();

    return {
      meta: {
        current: page,
        pageSize: defaultLimit,
        pages: totalPages,
        total: totalItems,
      },
      result,
    };
  }

  async findOne(id: string) {
    this.validateObjectId(id);

    // Khi lay chi tiet role, populate permissions va tra them field module.
    const role = await this.roleModel.findById(id).populate({
      path: 'permissions',
      select: {
        _id: 1,
        apiPath: 1,
        name: 1,
        method: 1,
        module: 1,
      },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto, user: IUser) {
    this.validateObjectId(id);

    const existingRole = await this.roleModel.findById(id);

    if (!existingRole) {
      throw new NotFoundException('Role not found');
    }

    if (updateRoleDto.permissions) {
      this.validatePermissionIds(updateRoleDto.permissions);
    }

    // Fix bug theo bai hoc: update role cung phai check trung name voi role khac.
    if (updateRoleDto.name && updateRoleDto.name !== existingRole.name) {
      const duplicatedRole = await this.roleModel.findOne({
        name: updateRoleDto.name,
        _id: { $ne: id },
      });

      if (duplicatedRole) {
        throw new BadRequestException('Role da ton tai');
      }
    }

    const result = await this.roleModel.updateOne(
      { _id: id },
      {
        ...updateRoleDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
      {
        runValidators: true,
      },
    );

    return result;
  }

  async remove(id: string, user: IUser) {
    this.validateObjectId(id);

    const role = await this.roleModel.findById(id);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    if (role.name === 'ADMIN') {
      throw new BadRequestException('Khong the xoa role ADMIN');
    }

    await this.roleModel.findByIdAndUpdate(id, {
      deletedBy: {
        _id: user._id,
        email: user.email,
      },
    });

    const result = await this.roleModel.softDelete({
      _id: id,
    });

    if (!result.deleted) {
      throw new NotFoundException('Role not found');
    }

    return result;
  }
}
