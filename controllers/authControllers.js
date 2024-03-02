import dotenv from "dotenv";
dotenv.config();
import HttpError from "../helpers/HttpError.js";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const {SECRET_KEY} = process.env;

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const normalizeEmail = email.trim().toLowerCase();
        const isUser = await User.findOne({ email: normalizeEmail }); 

        if (isUser) {
            throw HttpError(409, "Email already in use")
        }
        const hashPassword = await bcrypt.hash(password, 10); 
        const newUser = {
            name: name,
            email: normalizeEmail,
            password: hashPassword,
        }
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
    const normalizeEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizeEmail });
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!user || !passwordCompare) {
        throw HttpError(401, "Email or password invalid")
    }
    const payload = {
        id: user.id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user.id, {token})
    res.status(200).json({ token });
} catch (error) {
    next(error);
} 
}

export const logout = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, { token: null });
        res.status(204).json({message: "No Content"})
    } catch (error) {
        next(error);
    }
}

export const current = async (req, res, next) => {
    try {
        console.log(req.user);
        const { email, subscription } = req.user;

        res.json({email, subscription})
    } catch (error) {
        next(error);
    }
}
