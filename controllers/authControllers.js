import dotenv from "dotenv";
dotenv.config();
import HttpError from "../helpers/HttpError.js";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isUser = await User.findOne({ email: email });

    if (isUser) {
      throw HttpError(409, "Email already in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatar = gravatar.url(email);
    const newUser = {
      email,
      password: hashPassword,
      avatarURL: avatar,
    };
    console.log(newUser);
    const result = await User.create(newUser);
    console.log(result);
    const { subscription } = result;
    const user = { email, subscription };
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isUser = await User.findOne({ email: email });
    if (!isUser) {
      throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, isUser.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }
    const payload = {
      id: isUser._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(isUser.id, { token });
    const { subscription } = isUser;
    const user = { email, subscription };
    res.status(200).json({ token, user });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { token: null });
    res.status(204).json({ message: "No Content" });
  } catch (error) {
    next(error);
  }
};

export const current = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;

    res.json({ email, subscription });
  } catch (error) {
    next(error);
  }
};

export const updateUserSubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { subscription } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { subscription: subscription },
      { new: true }
    );

    if (!updatedUser) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
