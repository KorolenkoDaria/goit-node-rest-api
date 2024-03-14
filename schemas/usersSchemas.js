import Joi from "joi";

export const userSchemaValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
export const userSchemaUpdateSubscription = Joi.object({
  subscription: Joi.string().required(),
});
export const resendSchemaValidation = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "missing required field email" }),
});
