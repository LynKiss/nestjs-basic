import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Permission } from '../../permissions/schemas/permission.schema';

export type RoleDocument = HydratedDocument<Role>;

// Role la tap hop cac permission.
// 1 user se gan 1 role, va role do chua n permission.
@Schema({ timestamps: true })
export class Role {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: true })
  isActive: boolean;

  // Mang ObjectId tham chieu den collection permissions.
  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: Permission.name,
    required: true,
  })
  permissions: Permission[];

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

export const RoleSchema = SchemaFactory.createForClass(Role);
