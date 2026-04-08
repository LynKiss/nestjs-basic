import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Ham nay nhan password goc va tra ve password da duoc hash bang bcrypt.
  hashPassword = (password: string) => {
    // Tao salt de tang do an toan khi hash password.
    const salt = bcrypt.genSaltSync(10);

    // Ket hop password voi salt de tao ra chuoi hash.
    const hash = bcrypt.hashSync(password, salt);

    // Tra ve password da ma hoa.
    return hash;
  };

  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.create({
      ...createUserDto,
      // Khong luu password goc vao database, chi luu password da hash.
      password: this.hashPassword(createUserDto.password),
    });
    return user;
  }

  // Neu viet theo Node.js thuong thi tuong duong:
  // const users = await UserModel.find();
  findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    // Kiem tra id co dung dinh dang MongoDB ObjectId hay khong.
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'not found user';
    }

    // Neu viet theo Node.js thuong thi tuong duong:
    // const user = await UserModel.findOne({ _id: req.params.id });
    return this.userModel.findOne({
      _id: id,
    });
  }

  async findOneByUseName(username: string) {
    return this.userModel.findOne({
      email: username,
    });
  }

  checkUserPassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    // Neu viet theo Node.js thuong thi tuong duong:
    // await UserModel.updateOne({ _id: req.params.id }, req.body);
    return this.userModel.updateOne(
      {
        _id: id,
      },
      { ...updateUserDto },
    );
  }

  async remove(id: string) {
    // Kiem tra id co dung dinh dang MongoDB ObjectId hay khong.
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'not found user';
    }

    // Neu viet theo Node.js thuong thi tuong duong:
    // await UserModel.deleteOne({ _id: req.params.id });
    return this.userModel.deleteOne({
      _id: id,
    });
  }
}
