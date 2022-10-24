const Joi = require("joi");

const id = Joi.number().integer();
const comment = Joi.string().min(5).max(250);
const date = Joi.date();
const acepted = Joi.boolean();
//const userId = Joi.number().integer();
const userPetId = Joi.number().integer();


const createPetitionSchema = Joi.object({
  comment: comment.required(),
  date: date.required(),
  //userId,
  userPetId: userPetId.required(),
});

const updatePetitionSchema = Joi.object({
  acepted: acepted.required()
});

const getPetitionSchema = Joi.object({
  id: id.required()
});

module.exports = { createPetitionSchema,updatePetitionSchema, getPetitionSchema }
