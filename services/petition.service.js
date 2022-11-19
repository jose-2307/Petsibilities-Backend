const boom = require("@hapi/boom");

const config = require("./../config/config");
const { models } = require("./../libs/sequelize");
const AuthService = require("./auth.service");
const UserService = require("./user.service");
const PetService = require("./pet.service");
const {pagination} = require("../utils/functions");


const serviceAuth = new AuthService();
const serviceUser = new UserService();
const servicePet = new PetService();

class PetitionService {
  constructor(){}

  async create(data) {
    const { userId, userPetId, comment } = data;
    const validate = await models.Petition.findAll({where:{userId,userPetId}});
    if (validate.length >= 1){
      throw boom.conflict("Petition already exists.");
    }
    const adopter = await serviceUser.findOne(userId);
    const userPet = await serviceUser.findOneUserPet(userPetId);
    const owner = await serviceUser.findOne(userPet.userId);
    const pet = await servicePet.findOne(userPet.petId);
    if (userId == owner.dataValues.id) {
      throw boom.conflict("You cannot apply for your own pet.");
    }
    const mailToAdopter = {
      from: config.email,
      to: `${adopter.email}`,
      subject: "Petición enviada con éxito.",
      html: `<p>
        Acabas de solicitar la adopción de ${pet.name}. ¡Buena suerte!
        <br>Por favor <b>espara hasta nuevo aviso</b>, mientras que el dueño evalúa tu petición.
      </p>`
    }
    const newPetition = await models.Petition.create(data);
    const mailOwner = {
      from: config.email,
      to: `${owner.email}`,
      subject: "Petición de adopción recibida.",
      html: `<p>
        ¡Hola, ${owner.name}! Acabas de recibir una petición de adopción para ${pet.name}.
        <br>
        <br>
        <b>Detalle de la petición:</b>
          <ul>
            <li>Nombre del postulante: ${adopter.name}</li>
            <li>Comentario: ${comment}</li>
            <li>Fecha: ${newPetition.date}</li>
          </ul>
      </p>`
    }
    const resp1 = await serviceAuth.sendMail(mailToAdopter);
    const resp2 = await serviceAuth.sendMail(mailOwner);
    return {
      resp1,
      resp2,
      newPetition
    }
  }

  async findSent(userId,limit,offset) {
    const petitions = await models.Petition.findAll({where:{userId}});
    const userPets = [];
    const pets = [];
    for (const p of petitions) {
      userPets.push(await serviceUser.findOneUserPet(p.userPetId));
    }
    for (const up of userPets) {
      pets.push(await servicePet.findOne(up.petId));
    }
    let petitionsPets = [];
    for (let i = 0; i < petitions.length; i++) {
      petitionsPets.push({petition:petitions[i],pet:pets[i]});
    }
    if (limit != undefined && offset != undefined) petitionsPets = pagination(limit,offset,petitionsPets);
    return {petitionsPets};
  }

  async findReceived(userId,limit,offset) {
    const userPets = await models.UserPet.findAll({where:{userId}});
    let petitions = [];
    for (const up of userPets){
      petitions.push(await models.Petition.findAll({where:{userPetId:up.id, acepted:null}}));
    }
    petitions = petitions.flat(1);
    const userPetsPetitions = [];
    const adopters = [];
    for (const p of petitions) {
      userPetsPetitions.push(await serviceUser.findOneUserPet(p.userPetId));
      let adopter = await serviceUser.findOne(p.userId);
      let score = await serviceUser.calculateScore(adopter.id);
      adopters.push({name: adopter.name, email: adopter.email, description: adopter.description, houseSize: adopter.houseSize, urlImage: adopter.urlImage, phoneNumber: adopter.phoneNumber, city: adopter.city.name, score: score});
    }
    const namePets = [];
    for (const upp of userPetsPetitions) {
      let pet = await servicePet.findOne(upp.petId);
      namePets.push({name:pet.name,images:pet.images});
    }
    let petitionsDetails = [];
    for (let i = 0; i <petitions.length; i++) {
      petitionsDetails.push({petition:petitions[i],pet:namePets[i],adopter:adopters[i]});
    }
    if (limit != undefined && offset != undefined) petitionsDetails = pagination(limit,offset,petitionsDetails);
    return {petitionsDetails};
  }


  async findOne(id) {
    const petition = await models.Petition.findAll({where:{id}});
    if(!petition) {
      throw boom.notFound("petition not found");
    }
    return petition[0];
  }

  async accept(userId,id,changes) { //mandar mail
    const petition = await this.findOne(id);
    const userPet = await serviceUser.findOneUserPet(petition.userPetId);
    if (userPet.userId != userId || changes.acepted === false) {
      throw boom.unauthorized();
    }
    const pet = await servicePet.findOne(userPet.petId);
    const adopter = await serviceUser.findOne(petition.userId);
    const adopted = await petition.update({acepted:changes.acepted});
    const lastOwner = await serviceUser.findOne(userPet.userId);
    const uri = `http://localhost:3001/score/${userPet.userId}?name=${lastOwner.name}`;
    const mail = {
      from: config.email,
      to: `${adopter.email}`,
      subject: "Petición de adopción aceptada.",
      html: `<p>
        ¡Felicidades ${adopter.name}! Tu petición de adopción para ${pet.name} fue <b>aprobada con éxito</b>.
        <br>
        <br>
        Ingresa al siguiente link para <b>calificar a ${lastOwner.name}:</b> ${uri}
      </p>`
    }
    const resp1 = await serviceAuth.sendMail(mail);
    return {resp1,adopted,petition};
  }


  async reject(userId,id,changes) { //mandar mail
    const petition = await this.findOne(id);
    const userPet = await serviceUser.findOneUserPet(petition.userPetId);
    if (userPet.userId != userId || changes.acepted === true) {
      throw boom.unauthorized();
    }
    const pet = await servicePet.findOne(userPet.petId);
    const adopter = await serviceUser.findOne(petition.userId);
    const rejected = await petition.update({acepted:changes.acepted});
    const mail = {
      from: config.email,
      to: `${adopter.email}`,
      subject: "Petición de adopción rechazada.",
      html: `<p>
        ¡Lo sentimos ${adopter.name}! Tu petición de adopción para ${pet.name} fue <b>rechazada por el dueño<b>.
      </p>`
    }
    const resp1 = await serviceAuth.sendMail(mail);
    return { resp1,rejected,petition };
  }
}

module.exports = PetitionService;
