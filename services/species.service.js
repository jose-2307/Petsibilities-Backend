const boom = require("@hapi/boom");

const { models } = require("./../libs/sequelize");

class SpeciesService {
  constructor(){}

  async create(data) {
    const newSpecies = await models.Species.create(data);
    return newSpecies;
  }

  async find() {
    const species = await models.Species.findAll();
    return species;
  }

  async findOne(id) {
    const species = await models.Species.findByPk(id, {
      include: ["breeds"]
    });
    if(!species) {
      throw boom.notFound("species not found");
    }
    return species;
  }

  async delete(id) {
    const species = await this.findOne(id);
    await species.destroy();
    return { id };
  }
}

module.exports = SpeciesService;
