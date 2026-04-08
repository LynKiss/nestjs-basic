import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

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

  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.create({
      ...createUserDto,
      password: this.hashPassword(createUserDto.password),
    });

    // CRUD response khong nen tra hash password ra ngoai client.
    const { password, ...result } = user.toObject();
    return result;
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

  async remove(id: string) {
    this.validateObjectId(id);

    const result = await this.userModel.softDelete({
      _id: id,
    });

    if (!result.deleted) {
      throw new NotFoundException('User not found');
    }

    return result;
  }
}
