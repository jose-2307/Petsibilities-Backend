const boom = require("@hapi/boom");

const { models } = require("./../libs/sequelize");

class RegionService {
  constructor(){}

  async create(data) {
    const newRegion = await models.Region.create(data);
    return newRegion;
  }

  async find() {
    const regions = await models.Region.findAll();
    return regions;
  }

  async findOne(id) {
    const region = await models.Region.findByPk(id, {
      include: ["cities"]
    });
    if(!region) {
      throw boom.notFound("region not found");
    }
    return region;
  }
  async findByName(name) {
    const region = await models.Region.findOne({
      where: {name},
      include: ["cities"],
    });
    if(!region) {
      throw boom.notFound("region not found");
    }
    return region;
  }

  async delete(id) {
    const region = await this.findOne(id);
    await region.destroy();
    return { id };
  }
}

module.exports = RegionService;
