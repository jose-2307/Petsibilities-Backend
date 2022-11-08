const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().max(15);
const description = Joi.string().min(10).max(250);
const age = Joi.number().integer();
const size = Joi.number().integer();
const wormed = Joi.boolean();
const adopted = Joi.boolean();
const sterilized = Joi.boolean();
const genderId = Joi.number().integer();
const breedId = Joi.number().integer();
const userId = Joi.number().integer();

const images = Joi.array().items(Joi.string()).min(1).max(5);

const createPetSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  age: age.required(),
  size: size.required(),
  wormed: wormed.required(),
  sterilized: sterilized.required(),
  genderId: genderId.required(),
  breedId: breedId.required(),
  images: images.required()
});
const updatePetSchema = Joi.object({
  name,
  description,
  age,
  size,
  wormed,
  adopted,
  sterilized
});
const getPetSchema = Joi.object({
  id: id.required(),
  userId
});

module.exports = { createPetSchema, getPetSchema, updatePetSchema }
