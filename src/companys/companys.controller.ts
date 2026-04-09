import {

  Controller,

  Get,

  Post,

  Body,

  Patch,

  Param,

  Delete,

  Query,

} from '@nestjs/common';



import { CompanysService } from './companys.service';



import { CreateCompanyDto } from './dto/create-company.dto';



import { UpdateCompanyDto } from './dto/update-company.dto';



import { User } from '../decorator/customize';



import { IUser } from '../users/users.interface';



@Controller('companys')

export class CompanysController {

  constructor(private readonly companysService: CompanysService) { }



  @Post()

  create(@Body() createCompanyDto: CreateCompanyDto, @User() user: IUser) {

    return this.companysService.create(createCompanyDto, user);

  }



  @Get()

  findAll(

    @Query('page') currentPage: string, // const currentPage :string = req.query.page



    @Query('limit') limit: string,



    @Query() qs: string,

  ) {

    return this.companysService.findAll(+currentPage, +limit, qs);

  }



  @Get(':id')

  findOne(@Param('id') id: string) {

    return this.companysService.findOne(id);

  }



  @Patch(':id')

  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {

    return this.companysService.update(id, updateCompanyDto);

  }



  @Delete(':id')

  remove(@Param('id') id: string, @User() user: IUser) {

    return this.companysService.remove(id, user);

  }

}

