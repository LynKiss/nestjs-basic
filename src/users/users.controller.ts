import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // POST /users
  // Nhan du lieu tu body de tao user moi.
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // GET /users
  // Lay danh sach tat ca users.
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // GET /users/:id
  // @Param('id') trong NestJS se lay gia tri id tren URL.
  // Neu viet theo Node.js/Express thi tuong duong:
  // const id: string = req.params.id;
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // PATCH /users/:id
  // Lay id tren URL va du lieu can cap nhat trong body.
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // DELETE /users/:id
  // Lay id tren URL de xoa user.
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
