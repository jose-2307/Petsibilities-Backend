const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string();
const email = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "cl"] }});
const password = Joi.string().alphanum().min(8).max(12);
const bankAccountNumber = Joi.string().min(8).max(30);
const bankAccountType = Joi.string().min(4).max(10);
const bankName = Joi.string().max(30);
const score = Joi.number().integer().min(1).max(5);
const houseSize = Joi.number().integer().min(10);
const roleId = Joi.number().integer();
const cityId = Joi.number().integer();


//user-pet
const userId = Joi.number().integer();
const petId = Joi.number().integer();
const date = Joi.date();

const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  bankAccountNumber,
  bankAccountType,
  bankName,
  houseSize,
  roleId: roleId.required(),
  cityId: cityId.required()
});

const createNewPetSchema = Joi.object({
  date: date.required(),
  userId: userId.required(),
  petId: petId.required()
});

const updateUserSchema = Joi.object({
  name,
  email,
  password,
  bankAccountNumber,
  bankAccountType,
  bankName,
  houseSize,
  score
});

const getUserSchema = Joi.object({
  id: id.required()
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema, createNewPetSchema }
