"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const fs = require("fs");
const fs_1 = require("fs");
const uploadImage = (image, imageName) => {
    const dirname = './files';
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname);
    }
    const ws = (0, fs_1.createWriteStream)(`files/${imageName}`);
    ws.write(image.buffer);
};
exports.uploadImage = uploadImage;
//# sourceMappingURL=auto_folder.js.map