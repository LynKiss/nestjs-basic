import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import aqp from 'api-query-params';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from '../users/users.interface';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import {
  Subscriber,
  SubscriberDocument,
} from './schemas/subscriber.schema';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectModel(Subscriber.name)
    private subscriberModel: SoftDeleteModel<SubscriberDocument>,
  ) {}

  // Validate ObjectId som de tranh cast error tu mongoose.
  private validateObjectId(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid subscriber id');
    }
  }

  // Tao moi subscriber va chan trung email.
  async create(createSubscriberDto: CreateSubscriberDto, user: IUser) {
    const { name, email, skills } = createSubscriberDto;

    const isExist = await this.subscriberModel.findOne({ email }).lean();

    if (isExist) {
      throw new BadRequestException(`Email: ${email} da ton tai tren he thong`);
    }

    const newSubscriber = await this.subscriberModel.create({
      name,
      email,
      skills,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });

    return {
      _id: newSubscriber._id,
      createdAt: newSubscriber.createdAt,
    };
  }

  // Lay skills subscriber theo email cua user dang dang nhap.
  async getSkills(user: IUser) {
    const { email } = user;
    return await this.subscriberModel.findOne({ email }, { skills: 1 });
  }

  // Cap nhat subscriber theo email cua user hien tai, neu chua co thi tao moi.
  async update(updateSubscriberDto: UpdateSubscriberDto, user: IUser) {
    const updated = await this.subscriberModel.updateOne(
      { email: user.email },
      {
        ...updateSubscriberDto,
        email: user.email,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
      { upsert: true },
    );

    return updated;
  }

  // Lay danh sach subscriber co phan trang, filter va sort.
  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, projection } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    const page = currentPage > 0 ? currentPage : 1;
    const defaultLimit = limit > 0 ? limit : 10;
    const offset = (page - 1) * defaultLimit;
    const totalItems = (await this.subscriberModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.subscriberModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      // @ts-ignore: api-query-params sort typing is broader than mongoose expects.
      .sort(sort as any)
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

  // Lay chi tiet mot subscriber theo id.
  async findOne(id: string) {
    this.validateObjectId(id);

    const subscriber = await this.subscriberModel.findById(id);

    if (!subscriber) {
      throw new NotFoundException('Subscriber not found');
    }

    return subscriber;
  }

  // Xoa mem subscriber va luu deletedBy.
  async remove(id: string, user: IUser) {
    this.validateObjectId(id);

    const subscriber = await this.subscriberModel.findById(id);

    if (!subscriber) {
      throw new NotFoundException('Subscriber not found');
    }

    await this.subscriberModel.findByIdAndUpdate(id, {
      deletedBy: {
        _id: user._id,
        email: user.email,
      },
    });

    const result = await this.subscriberModel.softDelete({
      _id: id,
    });

    if (!result.deleted) {
      throw new NotFoundException('Subscriber not found');
    }

    return result;
  }
}
