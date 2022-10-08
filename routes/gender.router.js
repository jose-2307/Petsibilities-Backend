const express = require("express");
const passport = require("passport");

const GenderService = require("./../services/gender.service");
const validatorHandler = require("./../middlewares/validator.handler");
const { createGenderSchema, getGenderSchema } = require("./../schemas/gender.schema");
const { checkRole } = require("./../middlewares/auth.handler");

const router = express.Router();
const service = new GenderService();

router.get("/",
  async (req, res, next) => {
    try {
      const genders = await service.find();
      res.json(genders);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id",
  validatorHandler(getGenderSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const gender = await service.findOne(id);
      res.json(gender);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/",
  // passport.authenticate("jwt",{session: false}),
  // checkRole("Admin"),
  validatorHandler(createGenderSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newGender = await service.create(body);
      res.status(201).json(newGender);
    } catch (error) {
      next(error)
    }
  }
);

router.delete("/:id",
  passport.authenticate("jwt",{session: false}),
  checkRole("Admin"),
  validatorHandler(getGenderSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.json({id});
    } catch (error) {
      next(error)
    }
  }
);

module.exports = router;
