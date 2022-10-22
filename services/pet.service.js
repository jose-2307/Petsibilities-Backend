const boom = require("@hapi/boom");

const CityService = require("./city.service");
const UserService = require("./user.service");
const { models } = require("./../libs/sequelize");

const serviceCity = new CityService();
const serviceUser = new UserService();

class PetService {
  constructor(){}

  async create(data) {
    const newPet = await models.Pet.create(data);
    return newPet;
  }

  async find(available) {
    if (!available) {
      const pets = await models.Pet.findAll();
      return pets;
    }
    const pets = await models.Pet.findAll({
      where: {adopted: false}
    });
    return pets;
  }

  async findByCity(cityName) {
    const city = await serviceCity.findByName(cityName);
    delete city.dataValues.name;
    delete city.dataValues.regionId;
    delete city.dataValues.id;
    const users = []; //[user1[pet1,pet2],user2[pet3,...,pet1],...]
    for(const user of city.users){
      users.push(await serviceUser.findOne(user.id));
    }
    let pets = [];
    for(const u of users){
      for(const pet of u.myPet){
        if(pet.adopted === false && await this.isOwner(u.id,pet.id,false)) {
          pets.push(pet);
        }
      }
    }
    return pets;
  }

  async findOne(id) {
    const pet = await models.Pet.findByPk(id, {
      include: ["breed","gender","images"]
    });
    if(!pet) {
      throw boom.notFound("pet not found");
    }
    return pet;
  }

  async isOwner(userId, petId, bom) { //verifica si este usuario es el último en relación a la mascota
    const usersPet = await models.UserPet.findAll({
      where: {
        petId
      }
    });
    usersPet.sort((a,b) => b.dataValues.id - a.dataValues.id);
    const ownerId = usersPet[0].dataValues.userId;
    const isMatch = ownerId == userId ? true : false;
    if (!isMatch && bom) {
      throw boom.unauthorized();
    }
    return isMatch;
  }

  async owner(petId) { //sin probar
    const usersPet = await models.UserPet.findAll({
      where: {
        petId
      }
    });
    usersPet.sort((a,b) => b.dataValues.id - a.dataValues.id);
    const ownerId = usersPet[0].dataValues.userId;
    const user = await serviceUser.findOne(ownerId);
    return user;
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
