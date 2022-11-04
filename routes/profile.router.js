const express = require("express");
const passport = require("passport");

const UserService = require("./../services/user.service");
const PetitionService = require("./../services/petition.service");
const PetService = require("./../services/pet.service");
const validatorHandler = require("./../middlewares/validator.handler");
const { updateUserSchema,createScoreSchema } = require("./../schemas/user.schema");
const { createPetitionSchema,getPetitionSchema,updatePetitionSchema } = require("./../schemas/petition.schema");
const { createPetSchema,getPetSchema,updatePetSchema } = require("./../schemas/pet.schema");

const router = express.Router();
const serviceUser = new UserService();
const servicePetition = new PetitionService();
const servicePet = new PetService();


router.get("/personal-information",
  passport.authenticate("jwt", {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      const resp = await serviceUser.findOne(user.sub);
      delete resp.dataValues.recoveryToken;
      res.json(resp);
    } catch (error) {
      next(error);
    }
  }
);

router.patch("/personal-information",
  passport.authenticate("jwt", {session: false}),
  validatorHandler(updateUserSchema, "body"),
  async (req, res, next) => {
    try {
      const user = req.user;
      const body = req.body;
      const resp = await serviceUser.update(user.sub,body);
      delete resp.dataValues.recoveryToken;
      res.json(resp);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/my-pet",
  passport.authenticate("jwt", {session: false}),
  validatorHandler(createPetSchema, "body"),
  async (req, res, next) => {
    try {
      const user = req.user;
      const body = req.body;
      const newPet = await serviceUser.newPet(user.sub,body);
      res.status(201).json(newPet);
    } catch (error) {
      next(error)
    }
  }
);

router.patch("/my-pet/:id",
  passport.authenticate("jwt",{session: false}),
  validatorHandler(getPetSchema, "params"),
  validatorHandler(updatePetSchema, "body"),
  async (req, res, next) => {
    try {
      const user = req.user;
      const { id } = req.params;
      const body = req.body;
      await servicePet.isOwner(user.sub, id, true);
      const resp = await servicePet.update(id,body);
      res.json(resp);
    } catch (error) {
      next(error)
    }
  }
);

router.delete("/my-pet/:id",
  passport.authenticate("jwt",{session: false}),
  validatorHandler(getPetSchema, "params"),
  async (req, res, next) => {
    try {
      const user = req.user;
      const { id } = req.params;
      await servicePet.isOwner(user.sub, id, true);
      await servicePet.delete(id);
      res.json({id});
    } catch (error) {
      next(error)
    }
  }
);

router.post("/score",
  passport.authenticate("jwt", {session: false}),
  validatorHandler(createScoreSchema, "body"),
  async (req, res, next) => {
    try {
      const user = req.user;
      const body = req.body;
      const newScore = await serviceUser.createScore(body,user.sub);
      res.status(201).json(newScore);
    } catch (error) {
      next(error)
    }
  }
);

router.get("/score",
  passport.authenticate("jwt", {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      const score = await serviceUser.calculateScore(user.sub);
      res.json(score);
    } catch (error) {
      next(error)
    }
  }
);

router.post("/petition",
  passport.authenticate("jwt", {session: false}),
  validatorHandler(createPetitionSchema, "body"),
  async (req, res, next) => {
    try {
      const user = req.user
      const body = req.body;
      const newPetition = await servicePetition.create({
        ...body,
        userId:user.sub
      });
      res.status(201).json(newPetition);
    } catch (error) {
      next(error)
    }
  }
);

router.get("/petition/sent",
  passport.authenticate("jwt", {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user
      const petitions = await servicePetition.findSent(user.sub);
      res.status(200).json(petitions);
    } catch (error) {
      next(error)
    }
  }
);

router.get("/petition/received",
  passport.authenticate("jwt", {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user
      const petitions = await servicePetition.findReceived(user.sub);
      res.status(200).json(petitions);
    } catch (error) {
      next(error)
    }
  }
);

router.patch("/petition/:id",
  passport.authenticate("jwt", {session: false}),
  validatorHandler(getPetitionSchema, "params"),
  validatorHandler(updatePetitionSchema, "body"),
  async (req, res, next) => {
    try {
      const user = req.user;
      const { id } = req.params;
      const body = req.body;
      const petition = await servicePetition.update(user.sub,id,body);
      res.json(petition);
    } catch (error) {
      next(error)
    }
  }
);

router.delete("/petition/:id",
  passport.authenticate("jwt", {session: false}),
  validatorHandler(getPetitionSchema, "params"),
  async (req, res, next) => {
    try {
      const user = req.user;
      const { id } = req.params;
      await servicePetition.delete(user.sub,id);
      res.json({id});
    } catch (error) {
      next(error)
    }
  }
);


module.exports = router;
