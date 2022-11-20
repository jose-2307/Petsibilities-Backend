const express = require("express");
const passport = require("passport");

const UserService = require("./../services/user.service");
const validatorHandler = require("./../middlewares/validator.handler");
const { createUserSchema,updateUserSchema,getUserSchema,createScoreSchema } = require("./../schemas/user.schema");
const { createPetSchema } = require("./../schemas/pet.schema");
const { checkRole } = require("./../middlewares/auth.handler");

const router = express.Router();
const service = new UserService();

router.get("/",
  passport.authenticate("jwt", {session: false}),
  checkRole("Admin"),
  async (req, res, next) => {
    try {
      const users = await service.find();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id",
  passport.authenticate("jwt", {session: false}),
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/",
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error)
    }
  }
);

router.post("/my-pet/:id",
  validatorHandler(getUserSchema, "params"),
  validatorHandler(createPetSchema, "body"),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const body = req.body;
      const newPet = await service.newPet(id,body);
      res.status(201).json(newPet);
    } catch (error) {
      next(error)
    }
  }
);

router.post("/score/:id",
  validatorHandler(getUserSchema, "params"),
  validatorHandler(createScoreSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const newScore = await service.createScore(body,id);
      res.status(201).json(newScore);
    } catch (error) {
      next(error)
    }
  }
);

router.get("/score/:id",
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const score = await service.calculateScore(id);
      res.json(score);
    } catch (error) {
      next(error)
    }
  }
);

router.patch("/:id",
  passport.authenticate("jwt", {session: false}),
  checkRole("Admin"),
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id,body);
      res.json(user);
    } catch (error) {
      next(error)
    }
  }
);

router.delete("/:id",
  passport.authenticate("jwt", {session: false}),
  checkRole("Admin"),
  validatorHandler(getUserSchema, "params"),
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


