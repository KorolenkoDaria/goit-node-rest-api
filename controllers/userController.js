import { User } from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
import * as path from "node:path";
import fs from "node:fs/promises";
import Jimp from "jimp";

const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw HttpError(400, "File not provided");
    }
    const { path: tmpPath, filename } = req.file;
    async function main() {
      const image = await Jimp.read(tmpPath);
      await image.resize(250, 250);
      await image.writeAsync(tmpPath);
    }

    const finalUpload = path.join(process.cwd(), "public/avatars", filename);
    await main();
    await fs.rename(tmpPath, finalUpload);
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { avatarURL: path.join("avatars", filename) },
      { new: true }
    );

    if (!updatedUser) {
      throw HttpError(404);
    }
    const { avatarURL } = updatedUser;
    res.status(200).json({ avatarURL });
  } catch (error) {
    next(error);
  }
};

export default updateAvatar;
