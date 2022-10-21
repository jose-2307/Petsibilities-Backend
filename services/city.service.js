const boom = require("@hapi/boom");
const { where } = require("sequelize");

const { models } = require("./../libs/sequelize");

class CityService {
  constructor(){}

  async create(data) {
    const newCity = await models.City.create(data);
    return newCity;
  }

  async find() {
    const cities = await models.City.findAll();
    return cities;
  }

  async findByName(name) {
    const city = await models.City.findOne({
      where: {name},
      include: ["users"],
    });
    if(!city) {
      throw boom.notFound("city not found");
    }
    return city;
  }

  async findOne(id) {
    const city = await models.City.findByPk(id, {
      include: ["region", "users"],
    });
    if(!city) {
      throw boom.notFound("city not found");
    }
    return city;
  }

  async delete(id) {
    const city = await this.findOne(id);
    await city.destroy();
    return { id };
  }
}

module.exports = CityService;
