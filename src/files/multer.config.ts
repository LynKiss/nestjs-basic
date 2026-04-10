import { Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { diskStorage } from 'multer';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  // Lay thu muc goc hien tai cua project de ghep duong dan upload mot cach on dinh.
  getRootPath = () => {
    return process.cwd();
  };

  // Dam bao thu muc dich da ton tai truoc khi Multer ghi file.
  // Neu thu muc chua co, mkdirSync voi recursive se tao day du cay thu muc.
  ensureExists(targetDirectory: string) {
    try {
      fs.mkdirSync(targetDirectory, { recursive: true });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Cau hinh mac dinh cho Multer.
  // Su dung diskStorage de tu quyet dinh thu muc dich va ten file khi upload.
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const folder =
            (req.headers['folder_type'] as string | undefined)?.trim() ||
            'default';
          const targetDirectory = path.join(
            this.getRootPath(),
            'public',
            'images',
            folder,
          );

          this.ensureExists(targetDirectory);
          cb(null, targetDirectory);
        },
        filename: (req, file, cb) => {
          const extName = path.extname(file.originalname);
          const baseName = path.basename(file.originalname, extName);
          const sanitizedBaseName = baseName.replace(/\s+/g, '-');
          const finalName = `${sanitizedBaseName}-${Date.now()}${extName}`;

          cb(null, finalName);
        },
      }),
    };
  }
}
