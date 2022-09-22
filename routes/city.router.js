const express = require("express");


const CityService = require("./../services/city.service");
const validatorHandler = require("./../middlewares/validator.handler");
const { createCitySchema, getCitySchema } = require("./../schemas/city.schema");
const { checkRole } = require("./../middlewares/auth.handler");

const router = express.Router();
const service = new CityService();

router.get("/",
  async (req, res, next) => {
    try {
      const cities = await service.find();
      res.json(cities);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id",
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


