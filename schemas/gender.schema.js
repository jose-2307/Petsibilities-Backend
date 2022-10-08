const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string();

const createGenderSchema = Joi.object({
  name: name.required(),
});

const getGenderSchema = Joi.object({
  id: id.required()
});

module.exports = { createGenderSchema, getGenderSchema }
