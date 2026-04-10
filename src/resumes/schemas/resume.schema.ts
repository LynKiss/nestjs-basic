import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ResumeDocument = HydratedDocument<Resume>;

// Lich su thay doi trang thai cua resume.
class ResumeHistory {
  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  updatedAt: Date;

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
@Schema({ timestamps: true })
export class Resume {
  @Prop({ required: true })
  email: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  status: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Company',
  })
  companyId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Job' })
  jobId: mongoose.Schema.Types.ObjectId;

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

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
