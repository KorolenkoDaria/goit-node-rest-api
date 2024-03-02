import Joi from "joi";

export const registerUserSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
});

export const loginUserSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
})
