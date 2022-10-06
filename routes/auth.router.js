const express = require("express");
const passport = require("passport");

const AuthService = require("./../services/auth.service");
const validatorHandler = require("./../middlewares/validator.handler");
const { loginSchema, refreshTokenSchema } = require("./../schemas/auth.schema");

const router = express.Router();
const service = new AuthService();

router.post("/login",
  passport.authenticate("local", {session: false}),
  validatorHandler(loginSchema),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(await service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

router.post("/refresh-token",
  validatorHandler(refreshTokenSchema),
  async (req, res, next) => {
    try {
      const refreshToken = req.headers["refresh"];
      res.json(await service.signRefreshToken(refreshToken));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
