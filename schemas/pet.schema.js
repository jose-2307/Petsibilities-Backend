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

//Filter => query
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const species = Joi.string();
const region = Joi.string();
const city = Joi.string();
const breed = Joi.string();
const gender = Joi.string();


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
const getQueryPetSchema = Joi.object({
  limit,
  offset,
  species,
  region,
  city,
  breed,
  gender
});

module.exports = { createPetSchema, getPetSchema, updatePetSchema, getQueryPetSchema }
