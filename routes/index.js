const express = require("express");
const roleRouter = require("./role.router");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1",router);
  router.use("/roles",roleRouter);
}

module.exports = routerApi;
