const express = require("express");
const passport = require("passport");

const PetService = require("./../services/pet.service");
const validatorHandler = require("./../middlewares/validator.handler");
const { createPetSchema,updatePetSchema,getPetSchema,getPetsByCitySchema } = require("./../schemas/pet.schema");
const { checkRole } = require("./../middlewares/auth.handler");

const router = express.Router();
const service = new PetService();

router.get("/",
  async (req, res, next) => {
    try {
      const { city } = req.query;
      //console.log("----------------------------"+city)
      if(!city) res.json(await service.find());

      //const pets = await service.find();

      res.json(await service.findByCity(city));
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

// router.get("/:id",
//   validatorHandler(getPetsByCitySchema, "params"),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const pet = await service.findOne(id);
//       res.json(pet);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

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

router.patch("/:id/:userId", //validar que el dueño (último) sea el que modifique.
  // passport.authenticate("jwt",{session: false}),
  // checkRole("Admin"),
  validatorHandler(getPetSchema, "params"),
  validatorHandler(updatePetSchema, "body"),
  async (req, res, next) => {
    try {
      const { id, userId } = req.params;
      const body = req.body;
      await service.isOwner(userId, id);
      const resp = await service.update(id,body);
      res.json(resp);
    } catch (error) {
      next(error)
    }
  }
);

router.delete("/:id/:userId", //validar que el dueño (último) sea el que elimine.
  passport.authenticate("jwt",{session: false}),
  checkRole("Admin"),
  validatorHandler(getPetSchema, "params"),
  async (req, res, next) => {
    try {
      const { id,userId } = req.params;
      await service.isOwner(userId, id);
      await service.delete(id);
      res.json({id});
    } catch (error) {
      next(error)
    }
  }
);

module.exports = router;
