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

@Injectable()
export class CompanysService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: SoftDeleteModel<CompanyDocument>,
  ) {}

  private validateObjectId(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid company id');
    }
  }

  async create(createCompanyDto: CreateCompanyDto) {
    return this.companyModel.create(createCompanyDto);
  }

  findAll() {
    return this.companyModel.find();
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

  async remove(id: string) {
    this.validateObjectId(id);

    const result = await this.companyModel.softDelete({
      _id: id,
    });

    if (!result.deleted) {
      throw new NotFoundException('Company not found');
    }

    return result;
  }
}
