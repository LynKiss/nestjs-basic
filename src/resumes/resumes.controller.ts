import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ResponseMessage, User } from '../decorator/customize';
import { IUser } from '../users/users.interface';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ResumesService } from './resumes.service';

// Controller resumes cung cap CRUD cho tai nguyen resume.
// Cac route nay deu nam duoi /api/v1/resumes do project dang dung global prefix + versioning URI.
@Controller({
  path: 'resumes',
  version: '1',
})
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  // Tao moi mot resume.
  // JWT bat buoc phai co trong header de backend lay thong tin user.
  @Post()
  @ResponseMessage('Create a new resume')
  create(@Body() createResumeDto: CreateResumeDto, @User() user: IUser) {
    return this.resumesService.create(createResumeDto, user);
  }

  // Lay danh sach resume cua user dang dang nhap.
  // Bai hoc dung POST /by-user de tranh xung dot voi route /:id.
  @Post('by-user')
  @ResponseMessage('Get Resumes by User')
  findByUser(@User() user: IUser) {
    return this.resumesService.findByUser(user);
  }

  // Lay tat ca resume theo co che pagination/filter.
  @Get()
  @ResponseMessage('Lay danh sach resume thanh cong')
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() qs: string,
  ) {
    return this.resumesService.findAll(+currentPage, +limit, qs);
  }

  // Lay chi tiet mot resume theo id.
  @Get(':id')
  @ResponseMessage('Lay chi tiet resume thanh cong')
  findOne(@Param('id') id: string) {
    return this.resumesService.findOne(id);
  }

  // Cap nhat resume, trong bai hoc chu yeu de doi status.
  @Patch(':id')
  @ResponseMessage('Update status resume')
  update(
    @Param('id') id: string,
    @Body() updateResumeDto: UpdateResumeDto,
    @User() user: IUser,
  ) {
    return this.resumesService.update(id, updateResumeDto, user);
  }

  // Xoa mem mot resume theo id.
  @Delete(':id')
  @ResponseMessage('Xoa resume thanh cong')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.resumesService.remove(id, user);
  }
}
