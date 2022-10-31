const boom = require("@hapi/boom");

const CityService = require("./city.service");
const UserService = require("./user.service");
const SpeciesService = require("./species.service");
const BreedService = require("./breed.service");
const GenderService = require("./gender.service");
const { models } = require("./../libs/sequelize");

const serviceCity = new CityService();
const serviceUser = new UserService();
const serviceSpecies = new SpeciesService();
const serviceBreed = new BreedService();
const serviceGender = new GenderService();

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

  async findBySpecies(speciesName,petsArray) {
    const species = await serviceSpecies.findByName(speciesName);
    const breeds = [];
    for(const s of species.breeds){
      breeds.push(await serviceBreed.findOne(s.id));
    }
    let pets = [];
    for(const b of breeds) {
      for(const p of b.pets) {
        pets.push(await this.findOne(p.id));
      }
    }
    if (petsArray !== undefined) {
      this.deleteInvalid(pets,petsArray);
    }
    return pets;
  }

  deleteInvalid(pets,petsArray){
    for (let i = 0; i < pets.length; i ++) {
      if (petsArray.includes(pets[i].id) === false) {
        pets.splice(i,1);
        i--;
      }
    }//return pets;
  }

  async findByGender(genderName,petsArray) {
    const gender = await serviceGender.findByName(genderName);
    const pets = [];
    for(const p of gender.pets) {
      pets.push(await this.findOne(p.id));
    }
    if (petsArray !== undefined) {
      this.deleteInvalid(pets,petsArray);
    }
    return pets;
  }

  async filter(city,species,breed,gender) {
    if (city === undefined && species === undefined) {
      //breed y gender
    }
    if (city === undefined && breed === undefined) {
      //species y gender
      const speciesPets = await this.findBySpecies(species);
      const array = speciesPets.map(sp => {
        return sp.id;
      });
      const genderPets = await this.findByGender(gender,array);
      return genderPets;
    }
    if (city === undefined && gender === undefined) {
      //species y breed
    }
    if (species === undefined && breed === undefined) {
      //city y gender
      const cityPets = await this.findByCity(city);
      const array = cityPets.map(cp => {
        return cp.id;
      });
      const genderPets = await this.findByGender(gender,array);
      return genderPets;
    }
    if (species === undefined && gender === undefined) {
      //city breed
    }
    if (breed === undefined && gender === undefined) {
      //city y species
      const cityPets = await this.findByCity(city);
      const array = cityPets.map(cp => {
        return cp.id;
      });
      const speciesPets = await this.findBySpecies(species,array);
      return speciesPets;

    }
    if (city === undefined) {
      //species, breed y gender
    }
    if (species === undefined) {
      //city, breed y gender
    }
    if (breed === undefined) {
      //city, species y gender
      const cityPets = await this.findByCity(city);
      const array = cityPets.map(cp => {
        return cp.id;
      });
      const speciesPets = await this.findBySpecies(species,array);
      const array2 = speciesPets.map(sp => {
        return sp.id;
      });
      const genderPets = await this.findByGender(gender,array2);
      return genderPets;
    }
    if (gender === undefined) {
      //city, species y breed
    }
    //todo
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
