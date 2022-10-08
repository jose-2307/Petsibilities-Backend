const express = require("express");
const passport = require("passport");

const BreedService = require("./../services/breed.service");
const validatorHandler = require("./../middlewares/validator.handler");
const { createBreedSchema,getBreedSchema } = require("./../schemas/breed.schema");
const { checkRole } = require("./../middlewares/auth.handler");

const router = express.Router();
const service = new BreedService();

router.get("/",
  async (req, res, next) => {
    try {
      const breeds = await service.find();
      res.json(breeds);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id",
  validatorHandler(getBreedSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const breed = await service.findOne(id);
      res.json(breed);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/",
  // passport.authenticate("jwt",{session: false}),
  // checkRole("Admin"),
  validatorHandler(createBreedSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newBreed = await service.create(body);
      res.status(201).json(newBreed);
    } catch (error) {
      next(error)
    }
  }
);

router.delete("/:id",
  passport.authenticate("jwt",{session: false}),
  checkRole("Admin"),
  validatorHandler(getBreedSchema, "params"),
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
