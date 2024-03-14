import dotenv from "dotenv";
dotenv.config();
import HttpError from "../helpers/HttpError.js";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import nodemailer from "nodemailer";
import { nanoid } from "nanoid";

const { SECRET_KEY, MAIL_TRAP_USER, MAIL_TRAP_PASS } = process.env;

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: MAIL_TRAP_USER,
    pass: MAIL_TRAP_PASS,
  },
});

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isUser = await User.findOne({ email: email });
    if (isUser) {
      throw HttpError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const verificationToken = nanoid();
    await transport.sendMail({
      to: email,
      from: "admem75213@gmail.com",
      subject: "Welcome to the PhoneBook",
      html: `To confirm you registration please click on the <a href="http://localhost:8080/api/users/verify/${verificationToken}">Link</a>`,
      text: `To confirm you registration please open the link http://localhost:8080/api/users/verify/${verificationToken}`,
    });

    const avatar = gravatar.url(email);

    const newUser = {
      email,
      password: hashPassword,
      avatarURL: avatar,
      verificationToken: verificationToken,
    };

    const result = await User.create(newUser);
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
    if (!isUser.verify) {
      throw HttpError(403, "Email is not verified");
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

export const verifyUser = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken: verificationToken });
    if (!user) {
      throw HttpError(404, "Not found");
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
};
export const resend = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw HttpError(400, "Missing required field email");
    }
    const user = await User.findOne({ email });
    if (user.verify) {
      throw HttpError(400, "Verification has already been passed");
    }
    const { verificationToken } = user;
    await transport.sendMail({
      to: email,
      from: "admem75213@gmail.com",
      subject: "Welcome to the PhoneBook",
      html: `To confirm you registration please click on the <a href="http://localhost:8080/api/users/verify/${verificationToken}">Link</a>`,
      text: `To confirm you registration please open the link http://localhost:8080/api/users/verify/${verificationToken}`,
    });

    console.log(user);
    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};
