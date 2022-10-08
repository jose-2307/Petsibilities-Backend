const express = require("express");
const roleRouter = require("./role.router");
const regionRouter = require("./region.router");
const cityRouter = require("./city.router");
const userRouter = require("./user.router");
const authRouter = require("./auth.router");
const profileRouter = require("./profile.router");
const speciesRouter = require("./species.router");
const breedRouter = require("./breed.router");
const gendersRouter = require("./gender.router");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1",router);
  router.use("/roles",roleRouter);
  router.use("/regions",regionRouter);
  router.use("/cities",cityRouter);
  router.use("/users",userRouter);
  router.use("/auth",authRouter);
  router.use("/profile",profileRouter);
  router.use("/species",speciesRouter);
  router.use("/breeds",breedRouter);
  router.use("/genders",gendersRouter);
} //localhost:3000/api/v1/auth/login

module.exports = routerApi;
