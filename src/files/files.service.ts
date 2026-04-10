import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs/promises';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

type UploadedFileInfo = {
  originalname: string;
  mimetype: string;
  size: number;
  fieldname: string;
  filename?: string;
  path?: string;
  destination?: string;
};

@Injectable()
export class FilesService {
  // Sau khi Multer ghi file xuong o dia, service nay chuan hoa response de FE lay ten file da upload.
  // Frontend co the luu gia tri filename nay vao field logo cua company.
  processUploadedFile(file: UploadedFileInfo) {
    if (!file?.filename || !file?.path) {
      throw new Error('Uploaded file khong hop le');
    }

    return {
      fileName: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      destination: file.destination,
      path: file.path,
    };
  }

  // Neu business logic sau upload bi loi thi goi ham nay de xoa file vua luu, tranh sinh file rac.
  async removeUploadedFile(filePath?: string) {
    if (!filePath) return;

    try {
      await fs.unlink(filePath);
    } catch {
      // Bo qua loi xoa file de khong che mat exception goc.
    }
  }

  create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
