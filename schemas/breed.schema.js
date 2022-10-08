const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string();
const speciesId = Joi.number().integer();

const createBreedSchema = Joi.object({
  name: name.required(),
  regionId: speciesId.required()
});

const getBreedSchema = Joi.object({
  id: id.required()
});

module.exports = { createBreedSchema, getBreedSchema }
