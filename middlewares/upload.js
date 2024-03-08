import multer from "multer";
import * as path from "node:path";
import * as crypto from "node:crypto";
import jimp from "jimp";

const dirname = process.cwd();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(dirname, "tmp"));
  },
  filename: (req, file, cb) => {
    const prefix = crypto.randomUUID();
    const fileName = `${prefix}_${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

export default upload;
