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
    this.validateObjectId(createResumeDto.companyId, 'company id');
    this.validateObjectId(createResumeDto.jobId, 'job id');

    // Theo bai hoc, khi tao moi thi status ban dau luon la PENDING.
    const initialStatus = 'PENDING';

    // Dong lich su dau tien cung phai phan anh status ban dau va nguoi tao.
    const initialHistory = [
      {
        status: initialStatus,
        updatedAt: new Date(),
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    ];

    // Backend tu lay email, userId, createdBy tu JWT thay vi tin du lieu FE gui len.
    return this.resumeModel.create({
      ...createResumeDto,
      email: user.email,
      userId: user._id,
      status: initialStatus,
      history: initialHistory,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
  }

  // Lay tat ca resume cua chinh user dang dang nhap.
  // Endpoint nay phuc vu frontend xem lai lich su apply job cua user.
  async findByUser(user: IUser) {
    return this.resumeModel
      .find({
        userId: user._id,
      })
      .sort({ createdAt: -1 })
      // Fix bug: API by-user can populate ten cong ty va ten job de FE hien thi ngay.
      .populate([
        {
          path: 'companyId',
          select: {
            name: 1,
          },
        },
        {
          path: 'jobId',
          select: {
            name: 1,
          },
        },
      ])
      .exec();
  }

  // Lay danh sach resume co phan trang/filter/sort.
  async findAll(currentPage: number, limit: number, qs: string) {
    // api-query-params tach query string thanh 4 phan:
    // - filter: dieu kien where
    // - sort: sap xep
    // - population: du lieu can populate, vi du companyId,jobId
    // - projection: danh sach field can tra ve, duoc map tu query `fields=...`
    const { filter, sort, projection, population } = aqp(qs);
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
      // Populate truoc de mongoose no du lieu tham chieu cua companyId/jobId.
      .populate(population)
      // Select sau do de gioi han field tra ve theo query `fields=...`.
      .select(projection as any)
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

    const currentResume = await this.resumeModel.findById(id);

    if (!currentResume) {
      throw new NotFoundException('Resume not found');
    }

    // Sao chep lich su hien tai de push them ban ghi moi neu status thay doi.
    const nextHistory = [...(currentResume.history ?? [])];

    if (updateResumeDto.status !== currentResume.status) {
      nextHistory.push({
        status: updateResumeDto.status,
        updatedAt: new Date(),
        updatedBy: {
          _id: user._id as any,
          email: user.email,
        },
      } as any);
    }

    // Dong bo status hien tai, lich su moi va thong tin nguoi update.
    const updatedResume = await this.resumeModel.findByIdAndUpdate(
      id,
      {
        status: updateResumeDto.status,
        history: nextHistory,
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
  // Truoc khi soft delete, service se luu deletedBy de phuc vu audit.
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
