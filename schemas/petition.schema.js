const Joi = require("joi");

const id = Joi.number().integer();
const comment = Joi.string().min(5).max(250);
const date = Joi.date();
const accepted = Joi.boolean();
//const userId = Joi.number().integer();
const userPetId = Joi.number().integer();


const createPetitionSchema = Joi.object({
  comment: comment.required(),
  date,
  //userId,
  userPetId: userPetId.required(),
});

const updatePetitionSchema = Joi.object({
  accepted: accepted.required()
});

const getPetitionSchema = Joi.object({
  id: id.required()
});

module.exports = { createPetitionSchema,updatePetitionSchema, getPetitionSchema }
