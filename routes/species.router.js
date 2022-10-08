const express = require("express");
const passport = require("passport");

const SpeciesService = require("./../services/species.service");
const validatorHandler = require("./../middlewares/validator.handler");
const { createSpeciesSchema,getSpeciesSchema } = require("./../schemas/species.schema");
const { checkRole } = require("./../middlewares/auth.handler");

const router = express.Router();
const service = new SpeciesService();

router.get("/",
  async (req, res, next) => {
    try {
      const species = await service.find();
      res.json(species);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id",
  validatorHandler(getSpeciesSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const species = await service.findOne(id);
      res.json(species);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/",
  // passport.authenticate("jwt",{session: false}),
  // checkRole("Admin"),
  validatorHandler(createSpeciesSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newSpecies = await service.create(body);
      res.status(201).json(newSpecies);
    } catch (error) {
      next(error)
    }
  }
);

router.delete("/:id",
  passport.authenticate("jwt",{session: false}),
  checkRole("Admin"),
  validatorHandler(getSpeciesSchema, "params"),
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
