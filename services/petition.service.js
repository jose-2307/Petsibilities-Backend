const boom = require("@hapi/boom");

const { models } = require("./../libs/sequelize");

class PetitionService {
  constructor(){}

  async create(data) {
    const newPetition = await models.Petition.create(data);
    return newPetition;
  }

  async find() {
    const petitions = await models.Petition.findAll();
    return petitions;
  }

  async findOne(id) {
    const petition = await models.Petition.findByPk(id)
    if(!petition) {
      throw boom.notFound("petition not found");
    }
    return petition;
  }

  async delete(id) {
    const petition = await this.findOne(id);
    await petition.destroy();
    return { id };
  }
}

module.exports = PetitionService;
