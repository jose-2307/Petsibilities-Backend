const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string();

const createSpeciesSchema = Joi.object({
  name: name.required()
});

const getSpeciesSchema = Joi.object({
  id: id.required()
});

module.exports = { createSpeciesSchema, getSpeciesSchema }
