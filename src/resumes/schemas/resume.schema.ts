import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ResumeDocument = HydratedDocument<Resume>;

// Lich su thay doi trang thai cua resume.
// Moi lan doi status, backend se push them mot object moi vao mang nay.
class ResumeHistory {
  // Trang thai tai thoi diem cap nhat, vi du: PENDING, REVIEWING...
  @Prop({ required: true })
  status: string;

  // Thoi diem trang thai nay duoc ghi nhan.
  @Prop({ required: true })
  updatedAt: Date;

  // Nguoi da thuc hien lan cap nhat trang thai nay.
  @Prop({
    type: {
      _id: { type: mongoose.Schema.Types.ObjectId },
      email: { type: String },
    },
    required: true,
  })
  updatedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };
}

// Schema Resume mo ta thong tin CV/ung tuyen cua user cho mot job.
// timestamps: true giup mongoose tu dong quan ly createdAt va updatedAt.
@Schema({ timestamps: true })
export class Resume {
  // Email cua user nop ho so.
  // Gia tri nay duoc backend lay tu req.user khi tao moi resume.
  @Prop({ required: true })
  email: string;

  // User id cua nguoi ung tuyen.
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  userId: mongoose.Schema.Types.ObjectId;

  // Duong dan/ten file CV ma user da upload truoc do.
  @Prop({ required: true })
  url: string;

  // Trang thai hien tai cua resume.
  @Prop({ required: true })
  status: string;

  // Cong ty ma user dang apply.
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Company',
  })
  companyId: mongoose.Schema.Types.ObjectId;

  // Job ma user dang apply.
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Job' })
  jobId: mongoose.Schema.Types.ObjectId;

  // Mang luu lich su bien dong trang thai cua resume.
  @Prop({
    type: [
      {
        status: { type: String, required: true },
        updatedAt: { type: Date, required: true },
        updatedBy: {
          type: {
            _id: { type: mongoose.Schema.Types.ObjectId, required: true },
            email: { type: String, required: true },
          },
          required: true,
        },
      },
    ],
    default: [],
  })
  history: ResumeHistory[];

  // Thong tin nguoi tao resume.
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

  // Thong tin nguoi cap nhat gan nhat.
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

  // Thong tin nguoi xoa mem resume.
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

  // Moc thoi gian tao duoc mongoose tu dong dien.
  @Prop()
  createdAt: Date;

  // Moc thoi gian update duoc mongoose tu dong cap nhat.
  @Prop()
  updatedAt: Date;

  // Danh dau trang thai soft delete cua document.
  @Prop()
  isDeleted: boolean;

  // Thoi diem document bi xoa mem.
  @Prop()
  deletedAt: Date;
}

// Chuyen class Resume thanh mongoose schema de dang ky vao module.
export const ResumeSchema = SchemaFactory.createForClass(Resume);
