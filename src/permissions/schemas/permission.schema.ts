import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PermissionDocument = HydratedDocument<Permission>;

// Moi permission dai dien cho 1 API/backend action trong he thong.
// Vi du: GET /api/v1/users, POST /api/v1/jobs...
@Schema({ timestamps: true })
export class Permission {
  // Ten de hien thi tren giao dien quan tri.
  @Prop({ required: true })
  name: string;

  // Duong dan API duoc phep truy cap.
  @Prop({ required: true })
  apiPath: string;

  // HTTP method cua API, vi du GET/POST/PATCH/DELETE.
  @Prop({ required: true })
  method: string;

  // Module chua API nay, vi du USERS, JOBS, RESUMES...
  @Prop({ required: true })
  module: string;

  // Thong tin nguoi tao de phuc vu audit trail.
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

  // Thong tin nguoi xoa mem permission.
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

export const PermissionSchema = SchemaFactory.createForClass(Permission);
