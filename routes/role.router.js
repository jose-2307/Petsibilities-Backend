const express = require("express");
const passport = require("passport");

const RoleService = require("./../services/role.service");
const validatorHandler = require("./../middlewares/validator.handler");
const { createRoleSchema,updateRoleSchema,getRoleSchema } = require("./../schemas/role.schema");
const { checkRole } = require("./../middlewares/auth.handler");

const router = express.Router();
const service = new RoleService();

router.get("/",
  passport.authenticate("jwt", {session: false}),
  checkRole("Admin"),
  async (req, res, next) => {
    try {
      const roles = await service.find();
      res.json(roles);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id",
  passport.authenticate("jwt", {session: false}),
  checkRole("Admin"),
  validatorHandler(getRoleSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const role = await service.findOne(id);
      res.json(role);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/",
  passport.authenticate("jwt", {session: false}),
  checkRole("Admin"),
  validatorHandler(createRoleSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newRole = await service.create(body);
      res.status(201).json(newRole);
    } catch (error) {
      next(error)
    }
  }
);

router.patch("/:id",
  passport.authenticate("jwt", {session: false}),
  checkRole("Admin"),
  validatorHandler(getRoleSchema, "params"),
  validatorHandler(updateRoleSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const role = await service.update(id,body);
      res.json(role);
    } catch (error) {
      next(error)
    }
  }
);

router.delete("/:id",
  passport.authenticate("jwt", {session: false}),
  checkRole("Admin"),
  validatorHandler(getRoleSchema, "params"),
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


