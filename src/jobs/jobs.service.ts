import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job, JobDocument } from './schemas/job.schema';
import { IUser } from '../users/users.interface';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name)
    private jobModel: SoftDeleteModel<JobDocument>,
  ) {}

  // Kiem tra ObjectId som de tranh loi cast error tu mongoose va tra ve message ro rang hon.
  private validateObjectId(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid job id');
    }
  }

  // Tao moi job va gan thong tin nguoi tao de phuc vu audit.
  async create(createJobDto: CreateJobDto, user: IUser) {
    return this.jobModel.create({
      ...createJobDto,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
  }

  // Lay danh sach job co phan trang va ho tro filter/sort thong qua api-query-params.
  // current va pageSize duoc loai khoi filter de tranh anh huong den query mongo.
  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    // Neu client khong gui page/pageSize hop le thi fallback ve gia tri an toan.
    const page = currentPage > 0 ? currentPage : 1;
    const defaultLimit = limit > 0 ? limit : 10;
    const offset = (page - 1) * defaultLimit;
    const totalItems = (await this.jobModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.jobModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      // @ts-ignore: api-query-params sort typing is broader than mongoose expects.
      .sort(sort as any)
      .populate(population)
      .exec();

    return {
      meta: {
        current: page,
        pageSize: defaultLimit,
        pages: totalPages,
        total: totalItems,
      },
      result,
    };
  }

  // Lay chi tiet mot job theo id.
  async findOne(id: string) {
    this.validateObjectId(id);

    const job = await this.jobModel.findById(id);

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    return job;
  }

  // Cap nhat job va ghi nhan nguoi cap nhat gan nhat.
  async update(id: string, updateJobDto: UpdateJobDto, user: IUser) {
    this.validateObjectId(id);

    const updatedJob = await this.jobModel.findByIdAndUpdate(
      id,
      {
        ...updateJobDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedJob) {
      throw new NotFoundException('Job not found');
    }

    return updatedJob;
  }

  // Xoa mem job, truoc do luu deletedBy de biet ai da thuc hien thao tac.
  async remove(id: string, user: IUser) {
    this.validateObjectId(id);

    const job = await this.jobModel.findById(id);

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    await this.jobModel.findByIdAndUpdate(id, {
      deletedBy: {
        _id: user._id,
        email: user.email,
      },
    });

    const result = await this.jobModel.softDelete({
      _id: id,
    });

    if (!result.deleted) {
      throw new NotFoundException('Job not found');
    }

    return result;
  }
}
