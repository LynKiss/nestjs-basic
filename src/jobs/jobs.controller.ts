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
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

// Controller jobs dinh nghia cac endpoint CRUD cho tai nguyen job.
// version: '1' ket hop voi global prefix trong main.ts tao ra duong dan /api/v1/jobs.
@Controller({
  path: 'jobs',
  version: '1',
})
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  // Tao job moi.
  @Post()
  @ResponseMessage('Tao job thanh cong')
  create(@Body() createJobDto: CreateJobDto, @User() user: IUser) {
    return this.jobsService.create(createJobDto, user);
  }

  // Lay danh sach job co ho tro pagination/filter.
  @Get()
  @ResponseMessage('Lay danh sach job thanh cong')
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() qs: string,
  ) {
    return this.jobsService.findAll(+currentPage, +limit, qs);
  }

  // Lay chi tiet mot job theo id.
  @Get(':id')
  @ResponseMessage('Lay chi tiet job thanh cong')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  // Cap nhat thong tin job.
  @Patch(':id')
  @ResponseMessage('Cap nhat job thanh cong')
  update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
    @User() user: IUser,
  ) {
    return this.jobsService.update(id, updateJobDto, user);
  }

  // Xoa mem job.
  @Delete(':id')
  @ResponseMessage('Xoa job thanh cong')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.jobsService.remove(id, user);
  }
}
