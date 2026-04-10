import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  ParseFilePipeBuilder,
  UploadedFile,
  UseInterceptors,
  InternalServerErrorException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public, ResponseMessage } from '../decorator/customize';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

type UploadedFilePayload = {
  originalname: string;
  mimetype: string;
  size: number;
  fieldname: string;
  filename?: string;
  path?: string;
  destination?: string;
};

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // Upload file qua form-data voi field name la "fileUpload".
  // Pipe nay cho phep mot so dinh dang thong dung va gioi han kich thuoc toi da 1MB.
  @Public()
  @Post('upload')
  @ResponseMessage('Upload Single File')
  @UseInterceptors(FileInterceptor('fileUpload'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType:
            /^(jpg|jpeg|png|image\/png|gif|txt|pdf|doc|docx|text\/plain)$/i,
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: UploadedFilePayload,
  ) {
    try {
      return this.filesService.processUploadedFile(file);
    } catch (error) {
      await this.filesService.removeUploadedFile(file?.path);
      throw new InternalServerErrorException('Upload file that bai');
    }
  }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}
