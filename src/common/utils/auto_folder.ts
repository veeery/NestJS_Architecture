import fs from 'fs';
import { createWriteStream } from 'fs';

export const uploadImage = (image: Express.Multer.File) => {
  const dirname = './files';
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname);
  }
  const ws = createWriteStream(`files/${Date.now()}-${image.originalname}`);
  ws.write(image.buffer);
};
