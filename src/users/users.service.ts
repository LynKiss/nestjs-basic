import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from './users.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,
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

  async create(createUserDto: CreateUserDto, currentUser: IUser) {
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

    const user = await this.userModel.create({
      ...registerUserDto,
      password: this.hashPassword(registerUserDto.password),
      role: 'USER',
    });

    return {
      _id: user._id,
      createdAt: user.createdAt,
    };
  }

  findAll() {
    return this.userModel.find().select('-password');
  }

  async findOne(id: string) {
    this.validateObjectId(id);

    const user = await this.userModel.findOne({
      _id: id,
    }).select('-password');

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // Method nay duoc auth dung de login, nen van can password hash de compare.
  async findOneByUsername(username: string) {
    return this.userModel.findOne({
      email: username,
    });
  }

  // Route refresh can doc refreshToken da luu trong DB, nen can query day du field auth.
  async findOneByIdForAuth(id: string) {
    this.validateObjectId(id);
    return this.userModel.findById(id);
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

    // Hardening: neu request van gui password thi service se hash truoc khi update.
    if (updatePayload.password) {
      updatePayload.password = this.hashPassword(updatePayload.password);
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updatePayload, {
        new: true,
        runValidators: true,
      })
      .select('-password');

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  async remove(id: string, currentUser: IUser) {
    this.validateObjectId(id);

    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
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
