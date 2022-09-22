const express = require("express");


const RegionService = require("./../services/region.service");
const validatorHandler = require("./../middlewares/validator.handler");
const { createRegionSchema,getRegionSchema } = require("./../schemas/region.schema");
const { checkRole } = require("./../middlewares/auth.handler");

const router = express.Router();
const service = new RegionService();

router.get("/",
  async (req, res, next) => {
    try {
      const regions = await service.find();
      res.json(regions);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id",
  validatorHandler(getRegionSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const region = await service.findOne(id);
      res.json(region);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/",
  validatorHandler(createRegionSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newRegion = await service.create(body);
      res.status(201).json(newRegion);
    } catch (error) {
      next(error)
    }
  }
);

router.delete("/:id",
  validatorHandler(getRegionSchema, "params"),
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
