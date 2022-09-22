const boom = require("@hapi/boom");

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
