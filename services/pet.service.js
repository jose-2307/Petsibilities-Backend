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

  async find() {
    const pets = await models.Pet.findAll();
    return pets;
  }

  async findByCity(cityName) {
    //obtenemos ciudad: {[users]}
    //obtenemos [users]: {[users-pets]}
    //obtenemos [users-pets]: {[pets]}
    //obtenemos [pets] con adopted ==="false"
    //verificar que el user sea el owner de la mascota(importante para el caso en el que una mascota haya sido adoptada por alguien de otra ciudad y éste la tenga en adopción) o obtener los únicos que cumplan con adopted ==="false"

    const city = await serviceCity.findByName(cityName);
    delete city.dataValues.name;
    delete city.dataValues.regionId;
    delete city.dataValues.id;
    const users = []; //[user1[pet1,pet2],user2[pet3,...,pet1],...]
    for(const user of city.users){
      users.push(await serviceUser.findOne(user.id));
    }

    const pets = [];
    for(const u of users){
      for(const pet of u.myPet){
        console.log("--------------------"+u.id,pet.id)
        if(pet.adopted === false && this.isOwner(u.id,pet.id) === true) {
          pets.push(pet);
        }
      }
    }
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
    // if (!isMatch) {
    //   throw boom.unauthorized();
    // }
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
