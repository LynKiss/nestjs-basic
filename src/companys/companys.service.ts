import { PassportStrategy } from '@nestjs/passport';



import {

  BadRequestException,

  Injectable,

  NotFoundException,

} from '@nestjs/common';



import { InjectModel } from '@nestjs/mongoose';



import mongoose from 'mongoose';



import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';



import { CreateCompanyDto } from './dto/create-company.dto';



import { UpdateCompanyDto } from './dto/update-company.dto';



import { Company, CompanyDocument } from './schemas/company.schema';



import { IUser } from '../users/users.interface';



import aqp from 'api-query-params';



@Injectable()

export class CompanysService {

  constructor(

    @InjectModel(Company.name)

    private companyModel: SoftDeleteModel<CompanyDocument>,

  ) { }



  private validateObjectId(id: string) {

    if (!mongoose.Types.ObjectId.isValid(id)) {

      throw new BadRequestException('Invalid company id');

    }

  }



  async create(createCompanyDto: CreateCompanyDto, user: IUser) {

    return this.companyModel.create({

      ...createCompanyDto,



      createdBy: {

        _id: user._id,



        email: user.email,

      },

    });

  }



  async findAll(currentPage: number, limit: number, qs: string) {

    const { filter, sort, projection, population } = aqp(qs);

    delete filter.page;

    delete filter.limit;

    const offset = (+currentPage - 1) * +limit;

    const defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.companyModel.find(filter)).length;

    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.companyModel

      .find(filter)

      .skip(offset)

      .limit(defaultLimit)

      // @ts-ignore: Unreachable code error

      .sort(sort)

      .populate(population)

      .exec();

    return {

      meta: {

        current: currentPage, // trang hiện tại

        pageSize: limit, // số lượng bản ghi đã lấy

        pages: totalPages, // tổng số trang với điều kiện query

        total: totalItems, // tổng số phần tử (số bản ghi)

      },

      result, // kết quả query

    };

  }



  async findOne(id: string) {

    this.validateObjectId(id);



    const company = await this.companyModel.findById(id);



    if (!company) {

      throw new NotFoundException('Company not found');

    }



    return company;

  }



  async update(id: string, updateCompanyDto: UpdateCompanyDto) {

    this.validateObjectId(id);



    const updatedCompany = await this.companyModel.findByIdAndUpdate(

      id,



      updateCompanyDto,



      {

        new: true,



        runValidators: true,

      },

    );



    if (!updatedCompany) {

      throw new NotFoundException('Company not found');

    }



    return updatedCompany;

  }



  async remove(id: string, user: IUser) {

    this.validateObjectId(id);



    const company = await this.companyModel.findById(id);



    if (!company) {

      throw new NotFoundException('Company not found');

    }



    await this.companyModel.findByIdAndUpdate(id, {

      deletedBy: {

        _id: user._id,



        email: user.email,

      },

    });



    const result = await this.companyModel.softDelete({

      _id: id,

    });



    if (!result.deleted) {

      throw new NotFoundException('Company not found');

    }



    return result;

  }

}

