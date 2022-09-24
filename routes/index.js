const express = require("express");
const roleRouter = require("./role.router");
const regionRouter = require("./region.router");
const cityRouter = require("./city.router");
const userRouter = require("./user.router");


function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1",router);
  router.use("/roles",roleRouter);
  router.use("/regions",regionRouter);
  router.use("/cities",cityRouter);
  router.use("/users",userRouter);
}

module.exports = routerApi;
