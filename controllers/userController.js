import { User } from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
import gravatar from "gravatar";
import * as path from "node:path";
import fs from "node:fs/promises";
import Jimp from "jimp";

const updateAvatar = async (req, res, next) => {
  const { path: tmpPath, filename } = req.file;

  async function main() {
    const image = await Jimp.read(tmpPath);
    await image.resize(250, 250);
    await image.writeAsync(tmpPath);
  }

  const finalUpload = path.join(process.cwd(), "public/avatars", filename);
  try {
    await main();
    await fs.rename(tmpPath, finalUpload);
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { avatarURL: finalUpload },
      { new: true }
    );
    if (!updatedUser) {
      throw HttpError(404);
    }
    res.status(200).json({ avatarURL: finalUpload });
  } catch (error) {
    next(error);
  }
};

export default updateAvatar;