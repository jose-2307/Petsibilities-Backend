const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string();

const createRegionSchema = Joi.object({
  name: name.required()
});

const getRegionSchema = Joi.object({
  id: id.required()
});

module.exports = { createRegionSchema, getRegionSchema }
