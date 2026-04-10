import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import { IUser } from '../users/users.interface';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Resume, ResumeDocument } from './schemas/resume.schema';

@Injectable()
export class ResumesService {
  constructor(
    @InjectModel(Resume.name)
    private resumeModel: SoftDeleteModel<ResumeDocument>,
  ) {}

  // Kiem tra ObjectId de tra loi ro rang truoc khi query mongoose.
  private validateObjectId(id: string, field = 'resume id') {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ${field}`);
    }
  }

  // Tao moi resume va gan audit fields.
  async create(createResumeDto: CreateResumeDto, user: IUser) {
    this.validateObjectId(createResumeDto.userId, 'user id');
    this.validateObjectId(createResumeDto.companyId, 'company id');
    this.validateObjectId(createResumeDto.jobId, 'job id');

    const initialHistory =
      createResumeDto.history && createResumeDto.history.length > 0
        ? createResumeDto.history.map((item) => ({
            ...item,
            updatedAt: item.updatedAt ?? new Date(),
          }))
        : [
            {
              status: createResumeDto.status,
              updatedAt: new Date(),
              updatedBy: {
                _id: user._id,
                email: user.email,
              },
            },
          ];

    return this.resumeModel.create({
      ...createResumeDto,
      history: initialHistory,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
  }

  // Lay danh sach resume co phan trang/filter/sort.
  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    const page = currentPage > 0 ? currentPage : 1;
    const defaultLimit = limit > 0 ? limit : 10;
    const offset = (page - 1) * defaultLimit;
    const totalItems = (await this.resumeModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.resumeModel
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

  // Lay chi tiet mot resume.
  async findOne(id: string) {
    this.validateObjectId(id);

    const resume = await this.resumeModel.findById(id);

    if (!resume) {
      throw new NotFoundException('Resume not found');
    }

    return resume;
  }

  // Cap nhat resume va tu dong append lich su neu status thay doi.
  async update(id: string, updateResumeDto: UpdateResumeDto, user: IUser) {
    this.validateObjectId(id);

    if (updateResumeDto.userId) this.validateObjectId(updateResumeDto.userId, 'user id');
    if (updateResumeDto.companyId)
      this.validateObjectId(updateResumeDto.companyId, 'company id');
    if (updateResumeDto.jobId) this.validateObjectId(updateResumeDto.jobId, 'job id');

    const currentResume = await this.resumeModel.findById(id);

    if (!currentResume) {
      throw new NotFoundException('Resume not found');
    }

    const nextHistory = [...(currentResume.history ?? [])];

    if (
      updateResumeDto.status &&
      updateResumeDto.status !== currentResume.status
    ) {
      nextHistory.push({
        status: updateResumeDto.status,
        updatedAt: new Date(),
        updatedBy: {
          _id: user._id as any,
          email: user.email,
        },
      } as any);
    }

    const updatedResume = await this.resumeModel.findByIdAndUpdate(
      id,
      {
        ...updateResumeDto,
        history: updateResumeDto.history ?? nextHistory,
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

    if (!updatedResume) {
      throw new NotFoundException('Resume not found');
    }

    return updatedResume;
  }

  // Xoa mem resume.
  async remove(id: string, user: IUser) {
    this.validateObjectId(id);

    const resume = await this.resumeModel.findById(id);

    if (!resume) {
      throw new NotFoundException('Resume not found');
    }

    await this.resumeModel.findByIdAndUpdate(id, {
      deletedBy: {
        _id: user._id,
        email: user.email,
      },
    });

    const result = await this.resumeModel.softDelete({
      _id: id,
    });

    if (!result.deleted) {
      throw new NotFoundException('Resume not found');
    }

    return result;
  }
}
