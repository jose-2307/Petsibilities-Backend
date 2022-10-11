const express = require("express");
const passport = require("passport");

const PetService = require("./../services/pet.service");
const validatorHandler = require("./../middlewares/validator.handler");
const { createPetSchema,updatePetSchema,getPetSchema } = require("./../schemas/pet.schema");
const { checkRole } = require("./../middlewares/auth.handler");

const router = express.Router();
const service = new PetService();

router.get("/",
  async (req, res, next) => {
    try {
      const pets = await service.find();
      res.json(pets);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id",
  validatorHandler(getPetSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const pet = await service.findOne(id);
      res.json(pet);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/",
  // passport.authenticate("jwt",{session: false}),
  // checkRole("Admin","Individual","Organization"),
  validatorHandler(createPetSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newPets = await service.create(body);
      res.status(201).json(newPets);
    } catch (error) {
      next(error)
    }
  }
);

/**
 * Debería de tomarse en cuenta el último registro del usuario al que esté ligado (dueño actual)
 * Pero...qué pasa si "B" desea adoptarle el perro a "A", y más adelante "A" desea adoptar de vuelta el perro a "B"???? Se vuelve a hacer el registro.
 */

router.patch("/:id", //validar que el dueño (último) sea el que modifique.
  passport.authenticate("jwt",{session: false}),
  checkRole("Admin"),
  validatorHandler(getPetSchema, "params"),
  validatorHandler(updatePetSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const resp = await service.update(id,body);
      res.json(resp);
    } catch (error) {
      next(error)
    }
  }
);

router.delete("/:id", //validar que el dueño (último) sea el que elimine.
  passport.authenticate("jwt",{session: false}),
  checkRole("Admin"),
  validatorHandler(getPetSchema, "params"),
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
