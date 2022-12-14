const express = require("express");
const passport = require("passport");

const CityService = require("./../services/city.service");
const validatorHandler = require("./../middlewares/validator.handler");
const { createCitySchema, getCitySchema } = require("./../schemas/city.schema");
const { checkRole,checkApiKey } = require("./../middlewares/auth.handler");

const router = express.Router();
const service = new CityService();

router.get("/",
  checkApiKey,
  async (req, res, next) => {
    try {
      const { city } = req.query;
      if(!city) res.json(await service.find());
      res.json(await service.findByName(city));
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id",
  checkApiKey,
  validatorHandler(getCitySchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const city = await service.findOne(id);
      res.json(city);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/",
  passport.authenticate("jwt",{session: false}),
  checkRole("Admin"),
  validatorHandler(createCitySchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCity = await service.create(body);
      res.status(201).json(newCity);
    } catch (error) {
      next(error)
    }
  }
);


router.delete("/:id",
  passport.authenticate("jwt",{session: false}),
  checkRole("Admin"),
  validatorHandler(getCitySchema, "params"),
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


