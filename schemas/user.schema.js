const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string();
const email = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "cl"] }});
const password = Joi.string().alphanum().min(8).max(12);
const bankAccount = Joi.string();
const score = Joi.number().integer().min(1).max(5);
const roleId = Joi.number().integer();
const cityId = Joi.number().integer();


const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  bankAccount,
  roleId,
  cityId: cityId.required()
});

const updateUserSchema = Joi.object({
  name,
  email,
  password,
  bankAccount,
  score
});

const getUserSchema = Joi.object({
  id: id.required()
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
