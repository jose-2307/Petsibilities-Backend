const boom = require("@hapi/boom");

const { models } = require("./../libs/sequelize");

class BreedService {
  constructor(){}

  async create(data) {
    const newBreed = await models.Breed.create(data);
    return newBreed;
  }

  async find() {
    const breeds = await models.Breed.findAll();
    return breeds;
  }

  async findOne(id) {
    const breed = await models.Breed.findByPk(id, {
      include: ["species","pets"]
    });
    if(!breed) {
      throw boom.notFound("breed not found");
    }
    return breed;
  }

  async delete(id) {
    const breed = await this.findOne(id);
    await breed.destroy();
    return { id };
  }
}

module.exports = BreedService;
