import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";
import updateAvatar from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatarURL"),
  updateAvatar
);

export default userRouter;
