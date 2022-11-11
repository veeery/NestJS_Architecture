import {
  Controller,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/common/utils/multer';

@Controller({ path: 'images' })
export class ImageController {
  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }
}
