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
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import {
  Permission,
  PermissionDocument,
} from './schemas/permission.schema';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name)
    private permissionModel: SoftDeleteModel<PermissionDocument>,
  ) {}

  private validateObjectId(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid permission id');
    }
  }

  async create(createPermissionDto: CreatePermissionDto, user: IUser) {
    const existingPermission = await this.permissionModel.findOne({
      apiPath: createPermissionDto.apiPath,
      method: createPermissionDto.method,
    });

    if (existingPermission) {
      throw new BadRequestException('Permission da ton tai');
    }

    const permission = await this.permissionModel.create({
      ...createPermissionDto,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });

    // Theo flow bai hoc, create chi can tra ve id va thoi diem tao.
    return {
      _id: permission._id,
      createdAt: permission.createdAt,
    };
  }

  // Ho tro pagination/filter/sort giong cac module khac trong project.
  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    const page = currentPage > 0 ? currentPage : 1;
    const defaultLimit = limit > 0 ? limit : 10;
    const offset = (page - 1) * defaultLimit;
    const totalItems = (await this.permissionModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.permissionModel
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

    const permission = await this.permissionModel.findById(id);

    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    return permission;
  }

  async update(
    id: string,
    updatePermissionDto: UpdatePermissionDto,
    user: IUser,
  ) {
    this.validateObjectId(id);

    const existingPermission = await this.permissionModel.findById(id);

    if (!existingPermission) {
      throw new NotFoundException('Permission not found');
    }

    const result = await this.permissionModel.updateOne(
      { _id: id },
      {
        ...updatePermissionDto,
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

    const permission = await this.permissionModel.findById(id);

    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    await this.permissionModel.findByIdAndUpdate(id, {
      deletedBy: {
        _id: user._id,
        email: user.email,
      },
    });

    const result = await this.permissionModel.softDelete({
      _id: id,
    });

    if (!result.deleted) {
      throw new NotFoundException('Permission not found');
    }

    return result;
  }
}
