// BadRequestException/NotFoundException dung de tra loi loi nghiep vu ro rang.
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// InjectModel dung de inject mongoose model vao service.
import { InjectModel } from '@nestjs/mongoose';
// mongoose duoc dung de validate ObjectId.
import mongoose from 'mongoose';
// bcrypt dung de hash va compare password.
import * as bcrypt from 'bcrypt';
// api-query-params ho tro parse query string thanh filter/sort/projection.
import aqp from 'api-query-params';
// DTO tao user va register user.
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
// DTO update user.
import { UpdateUserDto } from './dto/update-user.dto';
// User schema va type document cua mongoose.
import { User, UserDocument } from './schemas/user.schema';
// SoftDeleteModel la model da duoc mo rong boi plugin soft delete.
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
// IUser la interface user thong nhat cua project.
import { IUser } from './users.interface';
// Role schema va type document de tim role USER / populate role.
import { Role, RoleDocument } from '../roles/schemas/role.schema';
// USER_ROLE la hang so role user mac dinh.
import { USER_ROLE } from '../databases/sample';

@Injectable()
export class UsersService {
  constructor(
    // Inject model users de thao tac voi collection users.
    @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,
    // Inject model roles de tim role USER / populate role.
    @InjectModel(Role.name) private roleModel: SoftDeleteModel<RoleDocument>,
  ) {}

  // Luon hash password truoc khi ghi DB de tranh luu plain text.
  hashPassword = (password: string) => {
    // Tao salt ngau nhien cho bcrypt.
    const salt = bcrypt.genSaltSync(10);
    // Hash password plain text thanh chuoi an toan hon de luu DB.
    const hash = bcrypt.hashSync(password, salt);
    // Tra ve gia tri hash.
    return hash;
  };

  // Alias giu tuong thich voi mot so doan code/cu phap theo bai hoc.
  getHashPassword = (password: string) => this.hashPassword(password);

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
    // Validate role id duoc gui len.
    this.validateObjectId(createUserDto.role);

    // Kiem tra email da ton tai chua.
    const existingUser = await this.userModel
      .findOne({
        email: createUserDto.email,
      })
      .lean();

    // Neu email da ton tai thi dung ngay.
    if (existingUser) {
      throw new BadRequestException('Email da ton tai');
    }

    // Tao user moi va hash password truoc khi ghi DB.
    const user = await this.userModel.create({
      ...createUserDto,
      password: this.hashPassword(createUserDto.password),
      createdBy: {
        _id: currentUser._id,
        email: currentUser.email,
      },
    });

    // Tra ve thong tin toi thieu sau khi tao.
    return {
      _id: user._id,
      createdAt: user.createdAt,
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    // Kiem tra email dang ky da ton tai hay chua.
    const existingUser = await this.userModel
      .findOne({
        email: registerUserDto.email,
      })
      .lean();

    // Neu trung email thi tra loi ngay.
    if (existingUser) {
      throw new BadRequestException('Email da ton tai');
    }

    // Dang ky tai khoan moi se tu dong gan role USER mac dinh.
    const userRole = await this.roleModel.findOne({
      name: USER_ROLE,
    });

    if (!userRole) {
      throw new BadRequestException('Role USER chua duoc khoi tao');
    }

    // Tao user moi bang thong tin dang ky.
    const user = await this.userModel.create({
      ...registerUserDto,
      password: this.getHashPassword(registerUserDto.password),
      role: userRole?._id,
    });

    // Tra ve thong tin toi thieu sau khi dang ky.
    return {
      _id: user._id,
      createdAt: user.createdAt,
    };
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    // Parse query string thanh filter/sort/projection.
    const { filter, sort, projection } = aqp(qs);
    // Loai bo cac field phan trang khong phai filter DB.
    delete filter.current;
    delete filter.pageSize;

    // Chuan hoa current page va page size.
    const page = currentPage > 0 ? currentPage : 1;
    const defaultLimit = limit > 0 ? limit : 10;
    // Tinh so ban ghi can bo qua.
    const offset = (page - 1) * defaultLimit;
    // Dem tong so ban ghi phu hop filter.
    const totalItems = (await this.userModel.find(filter)).length;
    // Tinh tong so trang.
    const totalPages = Math.ceil(totalItems / defaultLimit);

    // Query danh sach user theo filter/sort/projection.
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

    // Tra ve meta + danh sach ket qua.
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
    // Validate id truoc khi query.
    this.validateObjectId(id);

    // Lay user chi tiet va bo password khoi response.
    const user = await this.userModel.findOne({
      _id: id,
    })
      .select('-password')
      .populate(this.getRoleSummaryPopulate());

    // Neu khong thay user thi bao loi.
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Tra ve user tim duoc.
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
    // Validate id truoc khi query.
    this.validateObjectId(id);
    // Route refresh can role + permissions + refreshToken, nen query day du cho auth.
    return this.userModel
      .findById(id)
      .populate(this.getRolePermissionsPopulate());
  }

  // Chi luu hash refresh token de giam rui ro neu DB bi lo du lieu.
  async updateUserRefreshToken(userId: string, refreshToken: string | null) {
    // Validate user id truoc khi update.
    this.validateObjectId(userId);

    // Neu co refresh token thi hash truoc khi luu.
    // Neu logout thi refreshToken = null.
    const refreshTokenHash = refreshToken
      ? this.hashPassword(refreshToken)
      : null;

    // Ghi refresh token hash moi vao DB.
    return this.userModel.findByIdAndUpdate(userId, {
      refreshToken: refreshTokenHash,
    });
  }

  // So khop password plain text voi hash tu DB.
  checkUserPassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // Validate user id.
    this.validateObjectId(id);

    // Clone payload de co the can thiep hash password neu can.
    const updatePayload = { ...updateUserDto } as UpdateUserDto & {
      password?: string;
    };

    // Neu request co role thi validate role id.
    if (updatePayload.role) {
      this.validateObjectId(updatePayload.role);
    }

    // Hardening: neu request van gui password thi service se hash truoc khi update.
    if (updatePayload.password) {
      updatePayload.password = this.hashPassword(updatePayload.password);
    }

    // Update user va tra ve document moi nhat.
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updatePayload, {
        new: true,
        runValidators: true,
      })
      .select('-password')
      .populate(this.getRoleSummaryPopulate());

    // Bao loi neu user khong ton tai.
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    // Tra ve user da update.
    return updatedUser;
  }

  async remove(id: string, currentUser: IUser) {
    // Validate user id.
    this.validateObjectId(id);

    // Tim user can xoa.
    const user = await this.userModel
      .findById(id)
      .populate(this.getRoleSummaryPopulate());

    // Bao loi neu khong tim thay user.
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

    // Luu thong tin ai la nguoi xoa de phuc vu audit.
    await this.userModel.findByIdAndUpdate(id, {
      deletedBy: {
        _id: currentUser._id,
        email: currentUser.email,
      },
    });

    // Thuc hien soft delete thay vi xoa cung document.
    const result = await this.userModel.softDelete({
      _id: id,
    });

    // Neu plugin khong xoa duoc thi xem nhu user khong ton tai.
    if (!result.deleted) {
      throw new NotFoundException('User not found');
    }

    // Tra ve ket qua soft delete.
    return result;
  }
}
