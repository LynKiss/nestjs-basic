import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: true })
export class Company {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  description: string;

  @Prop({
    type: {
      _id: { type: String, required: true },
      email: { type: String, required: true },
    },
  })
  createdBy: {
    _id: string;
    email: string;
  };

  @Prop({
    type: {
      _id: { type: String, required: true },
      email: { type: String, required: true },
    },
  })
  deletedBy: {
    _id: string;
    email: string;
  };

  @Prop()
  createAt: Date;

  @Prop()
  isDeletedAt: boolean;

  @Prop()
  deletedAt: Date;

  @Prop()
  updateAt: Date;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
