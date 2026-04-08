import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { timeStamp } from 'console';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  phone: string;

  @Prop()
  age: number;

  @Prop()
  address: string;

  @Prop()
  createAt: Date;

  @Prop()
  isDeletedAt: boolean;

  @Prop()
  deletedAt: Date;

  @Prop()
  updateAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
