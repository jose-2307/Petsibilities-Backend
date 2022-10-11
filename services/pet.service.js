const boom = require("@hapi/boom");

const { models } = require("./../libs/sequelize");

class PetService {
  constructor(){}

  async create(data) {
    const newPet = await models.Pet.create(data);
    return newPet;
  }

  async find() {
    const pets = await models.Pet.findAll();
    return pets;
  }

  async findOne(id) {
    const pet = await models.Pet.findByPk(id, {
      include: ["breed","gender"]
    });
    if(!pet) {
      throw boom.notFound("pet not found");
    }
    return pet;
  }

  async update(id, changes) {
    const pet = await this.findOne(id);
    const resp = await pet.update(changes);
    return resp;
  }

  async delete(id) {
    const pet = await this.findOne(id);
    await pet.destroy();
    return { id };
  }
}

module.exports = PetService;
