const express = require("express");
const passport = require("passport");

const PetService = require("./../services/pet.service");
const UserService = require("./../services/user.service");
const validatorHandler = require("./../middlewares/validator.handler");
const { createPetSchema,updatePetSchema,getPetSchema } = require("./../schemas/pet.schema");
const { checkRole } = require("./../middlewares/auth.handler");

const router = express.Router();
const service = new PetService();
const serviceUser = new UserService();

//solo para admin
router.get("/",
  // passport.authenticate("jwt",{session: false}),
  // checkRole("Admin"),
  async (req, res, next) => {
    try {
      const { available } = req.query;
      if(!available) res.json(await service.find(false));
      res.json(await service.find(available));
    } catch (error) {
      next(error);
    }
  }
);

// router.get("/filter/commune/:city",
//   validatorHandler(getPetsByCitySchema, "params"),
//   async (req, res, next) => {
//     try {
//       const { city } = req.params;
//       res.json(await service.findByCity(city));
//     } catch (error) {
//       next(error);
//     }
//   }
// );

router.get("/filter", //City => Species => Breeds => Gender
  async (req, res, next) => {
    try {
      const { species,city,breed,gender } = req.query;
      if(!species && !city && !breed && !gender) res.json(await service.find(true));
      if(species && !city && !breed && !gender) res.json(await service.findBySpecies(species));
      if(!species && city && !breed && !gender) res.json(await service.findByCity(city));
      if(!species && !city && !breed && gender) res.json(await service.findByGender(gender));
      res.json(await service.filter(city,species,breed,gender));
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id",
  // passport.authenticate("jwt",{session: false}),
  // checkRole("Admin","Individual","Organization"),
  validatorHandler(getPetSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const pet = await service.findOne(id);
      const owner = await service.owner(id);
      const score = await serviceUser.calculateScore(owner.id);
      res.json({pet,owner,score});
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

router.patch("/:id/:userId", //validar que el dueño (último) sea el que modifique.
  // passport.authenticate("jwt",{session: false}),
  // checkRole("Admin"),
  validatorHandler(getPetSchema, "params"),
  validatorHandler(updatePetSchema, "body"),
  async (req, res, next) => {
    try {
      const { id, userId } = req.params;
      const body = req.body;
      await service.isOwner(userId, id, true);
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
      await service.isOwner(userId, id, true);
      await service.delete(id);
      res.json({id});
    } catch (error) {
      next(error)
    }
  }
);

module.exports = router;
