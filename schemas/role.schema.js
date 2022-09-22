const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string();

const createRoleSchema = Joi.object({
  name: name.required()
});

const updateRoleSchema = Joi.object({
  name: name.required()
});

const getRoleSchema = Joi.object({
  id: id.required()
});

module.exports = { createRoleSchema, updateRoleSchema, getRoleSchema }
