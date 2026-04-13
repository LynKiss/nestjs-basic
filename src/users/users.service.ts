import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import aqp from 'api-query-params';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from './users.interface';
import { Role, RoleDocument } from '../roles/schemas/role.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,
    @InjectModel(Role.name) private roleModel: SoftDeleteModel<RoleDocument>,
  ) {}

  // Luon hash password truoc khi ghi DB de tranh luu plain text.
  hashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  };

  // Validate ObjectId som de API tra ve loi ro rang, thay vi cast error tu Mongoose.
  private validateObjectId(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user id');
    }
  }

  // Populate role gon nhe de API user tra ve role: { _id, name }.
  private getRoleSummaryPopulate() {
    return {
      path: 'role',
      select: {
        _id: 1,
        name: 1,
      },
    };
  }

  // Populate role day du permissions de auth/login co the tra ve quyen cua user.
  private getRolePermissionsPopulate() {
    return {
      path: 'role',
      select: {
        _id: 1,
        name: 1,
        permissions: 1,
      },
      populate: {
        path: 'permissions',
        select: {
          _id: 1,
          name: 1,
          apiPath: 1,
          method: 1,
          module: 1,
        },
      },
    };
  }

  async create(createUserDto: CreateUserDto, currentUser: IUser) {
    this.validateObjectId(createUserDto.role);

    const existingUser = await this.userModel
      .findOne({
        email: createUserDto.email,
      })
      .lean();

    if (existingUser) {
      throw new BadRequestException('Email da ton tai');
    }

    const user = await this.userModel.create({
      ...createUserDto,
      password: this.hashPassword(createUserDto.password),
      createdBy: {
        _id: currentUser._id,
        email: currentUser.email,
      },
    });

    return {
      _id: user._id,
      createdAt: user.createdAt,
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    const existingUser = await this.userModel
      .findOne({
        email: registerUserDto.email,
      })
      .lean();

    if (existingUser) {
      throw new BadRequestException('Email da ton tai');
    }

    const userRole = await this.roleModel.findOne({
      name: 'USER',
    });

    const user = await this.userModel.create({
      ...registerUserDto,
      password: this.hashPassword(registerUserDto.password),
      role: userRole?._id,
    });

    return {
      _id: user._id,
      createdAt: user.createdAt,
    };
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, projection } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    const page = currentPage > 0 ? currentPage : 1;
    const defaultLimit = limit > 0 ? limit : 10;
    const offset = (page - 1) * defaultLimit;
    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.userModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      // @ts-ignore: api-query-params sort typing is broader than mongoose expects.
      .sort(sort as any)
      .select('-password')
      .select(projection as any)
      .populate(this.getRoleSummaryPopulate())
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

    const user = await this.userModel.findOne({
      _id: id,
    })
      .select('-password')
      .populate(this.getRoleSummaryPopulate());

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // Method nay duoc auth dung de login, nen van can password hash de compare.
  async findOneByUsername(username: string) {
    return this.userModel
      .findOne({
        email: username,
      })
      .populate(this.getRolePermissionsPopulate());
  }

  // Route refresh can doc refreshToken da luu trong DB, nen can query day du field auth.
  async findOneByIdForAuth(id: string) {
    this.validateObjectId(id);
    return this.userModel
      .findById(id)
      .populate(this.getRolePermissionsPopulate());
  }

  // Chi luu hash refresh token de giam rui ro neu DB bi lo du lieu.
  async updateUserRefreshToken(userId: string, refreshToken: string | null) {
    this.validateObjectId(userId);

    const refreshTokenHash = refreshToken
      ? this.hashPassword(refreshToken)
      : null;

    return this.userModel.findByIdAndUpdate(userId, {
      refreshToken: refreshTokenHash,
    });
  }

  checkUserPassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    this.validateObjectId(id);

    const updatePayload = { ...updateUserDto } as UpdateUserDto & {
      password?: string;
    };

    if (updatePayload.role) {
      this.validateObjectId(updatePayload.role);
    }

    // Hardening: neu request van gui password thi service se hash truoc khi update.
    if (updatePayload.password) {
      updatePayload.password = this.hashPassword(updatePayload.password);
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updatePayload, {
        new: true,
        runValidators: true,
      })
      .select('-password')
      .populate(this.getRoleSummaryPopulate());

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  async remove(id: string, currentUser: IUser) {
    this.validateObjectId(id);

    const user = await this.userModel
      .findById(id)
      .populate(this.getRoleSummaryPopulate());

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Khong cho xoa tai khoan admin mac dinh hoac user dang mang role ADMIN.
    if (
      user.email === 'admin@gmail.com' ||
      (user.role &&
        typeof user.role === 'object' &&
        'name' in user.role &&
        user.role.name === 'ADMIN')
    ) {
      throw new BadRequestException('Khong the xoa tai khoan admin');
    }

    await this.userModel.findByIdAndUpdate(id, {
      deletedBy: {
        _id: currentUser._id,
        email: currentUser.email,
      },
    });

    const result = await this.userModel.softDelete({
      _id: id,
    });

    if (!result.deleted) {
      throw new NotFoundException('User not found');
    }

    return result;
  }
}
