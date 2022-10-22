const { Role, RoleSchema } = require("./role.model");
const { Region, RegionSchema } = require("./region.model");
const { City, CitySchema } = require("./city.model");
const { User, UserSchema } = require("./user.model");
const { Species, SpeciesSchema } = require("./species.model");
const { Breed, BreedSchema } = require("./breed.model");
const { Gender, GenderSchema } = require("./gender.model");
const { Pet, PetSchema } = require("./pet.model");
const { UserPet, UserPetSchema } = require("./user-pet.model");
const { Image, ImageSchema } = require("./image.model");
const { Petition, PetitionSchema } = require("./petition.model");


function setupModels(sequelize) {
  Role.init(RoleSchema, Role.config(sequelize));
  Region.init(RegionSchema, Region.config(sequelize));
  City.init(CitySchema, City.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  Species.init(SpeciesSchema, Species.config(sequelize));
  Breed.init(BreedSchema, Breed.config(sequelize));
  Gender.init(GenderSchema, Gender.config(sequelize));
  Pet.init(PetSchema, Pet.config(sequelize));
  UserPet.init(UserPetSchema, UserPet.config(sequelize));
  Image.init(ImageSchema, Image.config(sequelize));
  Petition.init(PetitionSchema, Petition.config(sequelize));


  Role.associate(sequelize.models);
  Region.associate(sequelize.models);
  City.associate(sequelize.models);
  User.associate(sequelize.models);
  Species.associate(sequelize.models);
  Breed.associate(sequelize.models);
  Gender.associate(sequelize.models);
  Pet.associate(sequelize.models);
  Image.associate(sequelize.models);
  UserPet.associate(sequelize.models);
}

module.exports = setupModels;



