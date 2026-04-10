import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type JobDocument = HydratedDocument<Job>;

// Schema Job mo ta cau truc document duoc luu trong collection jobs.
// timestamps: true se tu dong tao va cap nhat createdAt/updatedAt cho moi ban ghi.
@Schema({ timestamps: true })
export class Job {
  // Ten vi tri tuyen dung, vi du: Backend Developer, QA Engineer...
  @Prop({ required: true })
  name: string;

  // Danh sach ky nang can co cho job.
  // Luu dang mang string de de tim kiem/filter theo tung skill.
  @Prop({ type: [String], required: true })
  skills: string[];

  // Thong tin cong ty duoc embed truc tiep vao job.
  // _id tham chieu den Company, con name giup hien thi nhanh ma khong can query them.
  @Prop({
    type: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
      name: { type: String },
      logo: { type: String },
    },
    required: true,
  })
  company: {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    logo?: string;
  };

  // Dia diem lam viec cua job: Ha Noi, HCM, Remote...
  @Prop({ required: true })
  location: string;

  // Muc luong de xuat cho vi tri.
  @Prop({ required: true })
  salary: number;

  // So luong can tuyen cho job nay.
  @Prop({ required: true })
  quantity: number;

  // Cap do kinh nghiem, vi du: Intern, Fresher, Junior, Middle, Senior...
  @Prop({ required: true })
  level: string;

  // Mo ta cong viec, co the la HTML string de render tren frontend.
  @Prop({ required: true })
  description: string;

  // Ngay bat dau dang tuyen hoac ngay job co hieu luc.
  @Prop({ required: true })
  startDate: Date;

  // Ngay ket thuc nhan ho so.
  @Prop({ required: true })
  endDate: Date;

  // Trang thai bat/tat cua job.
  // Mac dinh la true de job moi tao co the hien thi ngay.
  @Prop({ default: true })
  isActive: boolean;

  // Luu thong tin user tao job de phuc vu audit trail.
  @Prop({
    type: {
      _id: { type: mongoose.Schema.Types.ObjectId },
      email: { type: String },
    },
  })
  createdBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  // Luu thong tin user cap nhat gan nhat.
  @Prop({
    type: {
      _id: { type: mongoose.Schema.Types.ObjectId },
      email: { type: String },
    },
  })
  updatedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  // Luu thong tin user thuc hien thao tac xoa mem.
  @Prop({
    type: {
      _id: { type: mongoose.Schema.Types.ObjectId },
      email: { type: String },
    },
  })
  deletedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  // Truong timestamp duoc mongoose tu dong quan ly khi bat timestamps.
  @Prop()
  createdAt: Date;

  // Truong timestamp duoc mongoose tu dong cap nhat moi lan update.
  @Prop()
  updatedAt: Date;

  // Phuc vu soft delete plugin de danh dau ban ghi da bi xoa mem hay chua.
  @Prop()
  isDeleted: boolean;

  // Thoi diem ban ghi bi xoa mem.
  @Prop()
  deletedAt: Date;
}

// Chuyen class Job thanh mongoose schema de dang ky voi module.
export const JobSchema = SchemaFactory.createForClass(Job);
