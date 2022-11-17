import * as fs from 'fs';
import { createWriteStream } from 'fs';

export const uploadImage = (image: Express.Multer.File, imageName:string) => {
  const dirname = './files';
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname);
  }
  const ws = createWriteStream(`files/${imageName}`);
  ws.write(image.buffer);
};
