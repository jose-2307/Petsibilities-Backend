const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string();
const regionId = Joi.number().integer();

const createCitySchema = Joi.object({
  name: name.required(),
  regionId: regionId.required()
});

const getCitySchema = Joi.object({
  id: id.required()
});

module.exports = { createCitySchema, getCitySchema }
