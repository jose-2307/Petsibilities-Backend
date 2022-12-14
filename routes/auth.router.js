const express = require("express");
const passport = require("passport");

const AuthService = require("./../services/auth.service");
const validatorHandler = require("./../middlewares/validator.handler");
const { loginSchema, refreshTokenSchema,recoverySchema,changePasswordSchema } = require("./../schemas/auth.schema");
const { checkApiKey } = require("./../middlewares/auth.handler");

const router = express.Router();
const service = new AuthService();

router.post("/login",
  checkApiKey,
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

router.patch("/logout",
  validatorHandler(refreshTokenSchema),
  async (req, res, next) => {
    try {
      const refreshToken = req.headers["refresh"];
      res.json(await service.logout(refreshToken));
    } catch (error) {
      next(error);
    }
  }
);

router.post("/recovery-password",
  checkApiKey,
  validatorHandler(recoverySchema),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      res.json(await service.sendRecovery(email));
    } catch (error) {
      next(error);
    }
  }
);

router.post("/change-password",
  validatorHandler(changePasswordSchema),
  async (req, res, next) => {
    try {
      const { newPassword,token } = req.body;
      res.json(await service.changePassword(token, newPassword));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
