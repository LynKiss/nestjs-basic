import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Version,
} from '@nestjs/common';
import { ResponseMessage, User } from '../decorator/customize';
import { IUser } from '../users/users.interface';
import { CompanysService } from './companys.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller({
  path: 'companys',
  version: '1',
})
export class CompanysController {
  constructor(private readonly companysService: CompanysService) {}

  @Post()
  @ResponseMessage('Tao cong ty thanh cong')
  create(@Body() createCompanyDto: CreateCompanyDto, @User() user: IUser) {
    return this.companysService.create(createCompanyDto, user);
  }

  @Get()
  @ResponseMessage('Lay danh sach cong ty thanh cong (v1)')
  findAll(
    @Query('page') currentPage: string,
    @Query('limit') limit: string,
    @Query() qs: string,
  ) {
    return this.companysService.findAll(+currentPage, +limit, qs);
  }

  @Version('2')
  @Get()
  @ResponseMessage('Lay danh sach cong ty thanh cong (v2)')
  findAllV2(
    @Query('page') currentPage: string,
    @Query('limit') limit: string,
    @Query() qs: string,
  ) {
    return this.companysService.findAll(+currentPage, +limit, qs);
  }

  @Get(':id')
  @ResponseMessage('Lay chi tiet cong ty thanh cong')
  findOne(@Param('id') id: string) {
    return this.companysService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Cap nhat cong ty thanh cong')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companysService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @ResponseMessage('Xoa cong ty thanh cong')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.companysService.remove(id, user);
  }
}
