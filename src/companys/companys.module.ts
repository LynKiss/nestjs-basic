import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanysService } from './companys.service';
import { CompanysController } from './companys.controller';
import { Company, CompanySchema } from './schemas/company.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
    ]),
  ],
  controllers: [CompanysController],
  providers: [CompanysService],
})
export class CompanysModule {}
