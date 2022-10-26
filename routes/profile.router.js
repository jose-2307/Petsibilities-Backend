const express = require("express");
const passport = require("passport");

const UserService = require("./../services/user.service");
const PetitionService = require("./../services/petition.service");
const validatorHandler = require("./../middlewares/validator.handler");
const { updateUserSchema } = require("./../schemas/user.schema");
const { createPetitionSchema,getPetitionSchema,updatePetitionSchema } = require("./../schemas/petition.schema");
const { checkRole } = require("./../middlewares/auth.handler");

const router = express.Router();
const serviceUser = new UserService();
const servicePetition = new PetitionService();


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

router.get("/petition",
  passport.authenticate("jwt", {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user
      const petitions = await servicePetition.findSent(user.sub);
      res.status(201).json(petitions);
    } catch (error) {
      next(error)
    }
  }
);


module.exports = router;
