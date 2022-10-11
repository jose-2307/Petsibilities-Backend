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

  async isOwner(userId, petId) { //verifica si este usuario es el último en relación a la mascota
    const usersPet = await models.UserPet.findAll({
      where: {
        petId
      }
    });
    usersPet.sort((a,b) => b.dataValues.id - a.dataValues.id);
    const ownerId = usersPet[0].dataValues.userId;
    const isMatch = ownerId == userId ? true : false;
    if (!isMatch) {
      throw boom.unauthorized();
    }
    return isMatch;
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
