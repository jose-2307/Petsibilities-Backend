const boom = require("@hapi/boom");

const RegionService = require("./region.service");
const CityService = require("./city.service");
const UserService = require("./user.service");
const SpeciesService = require("./species.service");
const BreedService = require("./breed.service");
const GenderService = require("./gender.service");
const { models } = require("./../libs/sequelize");
const {pagination} = require("../utils/functions");

const serviceRegion = new RegionService();
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

  async find(available,limit,offset) {
    if (!available) {
      const pets = await models.Pet.findAll();
      await this.petImages(pets);
      return pets;
    }
    let pets = await models.Pet.findAll({
      where: {adopted: false}
    });
    await this.petImages(pets);
    if (limit != undefined && offset != undefined) pets = pagination(limit,offset,pets);
    return pets;
  }

  async petImages(petArray) {
    for(const pet of petArray) {
      let p = await this.findOne(pet.id);
      pet.dataValues.images = p.images;
    }
  }

  deleteInvalid(pets,petsArray){
    for (let i = 0; i < pets.length; i ++) {
      if (petsArray.includes(pets[i].id) === false) {
        pets.splice(i,1);
        i--;
      }
    }
  }

  async findByRegion(regionName, cityName, limit, offset) {
    const region = await serviceRegion.findByName(regionName);
    delete region.dataValues.name;
    delete region.dataValues.id;
    if(cityName !== undefined ) {
      let resp = await this.findByCity(cityName);
      if (limit != undefined && offset != undefined) resp = pagination(limit,offset,resp);
      return resp;
    }
    const cities = [];
    for(const city of region.cities) {
      cities.push(await serviceCity.findOne(city.id));
    }
    const users = [];
    for (const city of cities) {
      for(const user of city.users){
        users.push(await serviceUser.findOne(user.id));
      }
    }
    let pets = [];
    for(const u of users){
      for(const pet of u.myPet){
        if(pet.adopted === false && await this.isOwner(u.id,pet.id,false)) {
          pets.push(pet);
        }
      }
    }
    if (limit != undefined && offset != undefined) pets = pagination(limit,offset,pets);
    return pets;
  }

  async findByCity(cityName) {
    const city = await serviceCity.findByName(cityName);
    delete city.dataValues.name;
    delete city.dataValues.regionId;
    delete city.dataValues.id;
    const users = [];
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

  async findBySpecies(speciesName,petsArray,breedName,limit,offset) {
    if(!speciesName) throw boom.badRequest();
    const species = await serviceSpecies.findByName(speciesName);
    const breeds = [];
    let pets = [];
    if(breedName !== undefined ) {
      const breed = await serviceBreed.findByName(breedName);
      for(const p of breed.pets) {
        if(p.adopted === false) pets.push(await this.findOne(p.id));
      }
      if (petsArray !== undefined && petsArray !== 0) this.deleteInvalid(pets,petsArray);
      if (limit != undefined && offset != undefined) pets = pagination(limit,offset,pets);
      return pets;
    }
    for(const s of species.breeds){
      breeds.push(await serviceBreed.findOne(s.id));
    }
    for(const b of breeds) {
      for(const p of b.pets) {
        if(p.adopted === false) pets.push(await this.findOne(p.id));
      }
    }
    if (petsArray !== undefined) this.deleteInvalid(pets,petsArray);
    if (limit != undefined && offset != undefined) pets = pagination(limit,offset,pets);
    return pets;
  }

  async findByGender(genderName,petsArray,limit,offset) {
    const gender = await serviceGender.findByName(genderName);
    let pets = [];
    for(const p of gender.pets) {
      if(p.adopted === false) pets.push(await this.findOne(p.id));
    }
    if (petsArray !== undefined) {
      this.deleteInvalid(pets,petsArray);
    }
    if (limit != undefined && offset != undefined) pets = pagination(limit,offset,pets);
    return pets;
  }


  async filter(query) {
    const {region,city,species,breed,gender,limit,offset} = query;
    if (region == undefined && city === undefined && breed === undefined) {//species y gender
      const speciesPets = await this.findBySpecies(species);
      const array = speciesPets.map(sp => {return sp.id});
      let genderPets = await this.findByGender(gender,array);
      if (limit != undefined && offset != undefined) genderPets = pagination(limit,offset,genderPets);
      return genderPets;
    }
    if (region == undefined && city === undefined && gender === undefined) {//species y breed
      let speciesPets = await this.findBySpecies(species,0,breed);
      if (limit != undefined && offset != undefined) speciesPets = pagination(limit,offset,speciesPets);
      return speciesPets;
    }
    if (species === undefined && breed === undefined && gender === undefined) {//region y city
      let regionPets = await this.findByRegion(region,city);
      if (limit != undefined && offset != undefined) regionPets = pagination(limit,offset,regionPets);
      return regionPets;
    }
    if (species === undefined && breed === undefined) {//region, city y gender
      const regionPets = await this.findByRegion(region,city);
      const array = regionPets.map(rp => {return rp.id});
      let genderPets = await this.findByGender(gender,array);
      if (limit != undefined && offset != undefined) genderPets = pagination(limit,offset,genderPets);
      return genderPets;
    }
    if (breed === undefined && gender === undefined) {//region, city y species
      const regionPets = await this.findByRegion(region,city);
      const array = regionPets.map(rp => {return rp.id});
      let speciesPets = await this.findBySpecies(species,array);
      if (limit != undefined && offset != undefined) speciesPets = pagination(limit,offset,speciesPets);
      return speciesPets;
    }
    if (region == undefined && city === undefined) {//species, breed y gender
      const speciesPets = await this.findBySpecies(species,0,breed);
      const array = speciesPets.map(sp => {return sp.id});
      let genderPets = await this.findByGender(gender,array);
      if (limit != undefined && offset != undefined) genderPets = pagination(limit,offset,genderPets);
      return genderPets;
    }
    if (breed === undefined) {//region, city, species y gender
      const regionPets = await this.findByRegion(region,city);
      const array = regionPets.map(rp => {return rp.id});
      const speciesPets = await this.findBySpecies(species,array);
      const array2 = speciesPets.map(sp => {return sp.id});
      let genderPets = await this.findByGender(gender,array2);
      if (limit != undefined && offset != undefined) genderPets = pagination(limit,offset,genderPets);
      return genderPets;
    }
    if (gender === undefined) {//region, city, species y breed
      const regionPets = await this.findByRegion(region,city);
      const array = regionPets.map(rp => {return rp.id});
      let speciesPets = await this.findBySpecies(species,array,breed);
      if (limit != undefined && offset != undefined) speciesPets = pagination(limit,offset,speciesPets);
      return speciesPets;
    }//todo
    const regionPets = await this.findByRegion(region,city);
    const array = regionPets.map(rp => {return rp.id});
    const speciesPets = await this.findBySpecies(species,array,breed);
    const array2 = speciesPets.map(sp => {return sp.id});
    let genderPets = await this.findByGender(gender,array2);
    if (limit != undefined && offset != undefined) genderPets = pagination(limit,offset,genderPets);
    return genderPets;
  }

  async findOne(id) {
    let pet = await models.Pet.findByPk(id, {
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

  async owner(petId) {
    const usersPet = await models.UserPet.findAll({
      where: {
        petId
      }
    });
    usersPet.sort((a,b) => b.dataValues.id - a.dataValues.id);
    const ownerId = usersPet[0].dataValues.userId;
    const user = await serviceUser.findOne(ownerId);
    delete user.dataValues.recoveryToken;
    delete user.dataValues.myPet;
    return user;
  }

  async findUserPetId(petId) {
    const owner = await this.owner(petId);
    const usersPet = await models.UserPet.findAll({
      where: {
        petId,
        userId: owner.id
      }
    });
    usersPet.sort((a,b) => b.dataValues.id - a.dataValues.id);
    const relationshipId = usersPet[0].dataValues.id;
    return relationshipId;
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
