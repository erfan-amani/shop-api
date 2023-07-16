const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().min(5).required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(5).required(),
  password: Joi.string().min(8).required(),
});

module.exports = { registerSchema, loginSchema };
