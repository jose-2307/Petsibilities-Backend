const boom = require("@hapi/boom");

const config = require("./../config/config");
const { models } = require("./../libs/sequelize");
const AuthService = require("./auth.service");
const UserService = require("./user.service");
const PetService = require("./pet.service");


const serviceAuth = new AuthService();
const serviceUser = new UserService();
const servicePet = new PetService();

class PetitionService {
  constructor(){}

  async create(data) {
    const { userId, userPetId, comment, date } = data;
    const validate = await models.Petition.findAll({where:{userId,userPetId}});
    if (validate.length >= 1){
      throw boom.conflict({message:"Petition already exists."});
    }
    const adopter = await serviceUser.findOne(userId);
    const userPet = await serviceUser.findOneUserPet(userPetId);
    const owner = await serviceUser.findOne(userPet.userId);
    const pet = await servicePet.findOne(userPet.petId);
    const mailToAdopter = {
      from: config.email,
      to: `${adopter.email}`,
      subject: "Petición enviada con éxito.",
      html: `<p>
        Acabas de solicitar la adopción de ${pet.name}. ¡Buena suerte!
        <br>Por favor <b>espara hasta nuevo aviso</b>, mientras que el dueño evalúa tu petición.
      </p>`
    }
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
            <li>Fecha: ${date}</li>
          </ul>
      </p>`
    }
    const newPetition = await models.Petition.create(data);
    const resp1 = await serviceAuth.sendMail(mailToAdopter);
    const resp2 = await serviceAuth.sendMail(mailOwner);
    return {
      resp1,
      resp2,
      newPetition
    }
  }

  async findSent(userId) {
    const petitions = await models.Petition.findAll({where:{userId}});
    const userPets = [];
    const pets = [];
    for (const p of petitions) {
      userPets.push(await serviceUser.findOneUserPet(p.userPetId));
    }
    for (const up of userPets) {
      pets.push(await servicePet.findOne(up.petId));
    }
    const petitionsPets = [];
    for (let i = 0; i <petitions.length; i++) {
      petitionsPets.push({petition:petitions[i],pet:pets[i]});
    }
    return {petitionsPets};
  }

  async findReceived(userId) {
    const userPets = await models.UserPet.findAll({where:{userId}});
    let petitions = [];
    for (const up of userPets){
      petitions.push(await models.Petition.findAll({where:{userPetId:up.id}}));
    }
    petitions = petitions.flat(1);
    const userPetsPetitions = [];
    const adopters = [];
    for (const p of petitions) {
      userPetsPetitions.push(await serviceUser.findOneUserPet(p.userPetId));
      let adopter = await serviceUser.findOne(p.userId);
      adopters.push({name: adopter.name, email: adopter.email, score: adopter.score, houseSize: adopter.houseSize, urlImage: adopter.urlImage, phoneNumber: adopter.phoneNumber, city: adopter.city.name});
    }
    const namePets = [];
    for (const upp of userPetsPetitions) {
      let pet = await servicePet.findOne(upp.petId);
      namePets.push({name:pet.name,images:pet.images});
    }
    const petitionsDetails = [];
    for (let i = 0; i <petitions.length; i++) {
      petitionsDetails.push({petition:petitions[i],pet:namePets[i],adopter:adopters[i]});
    }
    return {petitionsDetails};
  }


  async findOne(id) {
    const petition = await models.Petition.findByPk(id)
    if(!petition) {
      throw boom.notFound("petition not found");
    }
    return petition;
  }

  async update(userId,id,changes) { //mandar mail
    const petition = await this.findOne(id);
    const userPet = await serviceUser.findOneUserPet(petition.userPetId);
    if (userPet.userId != userId || changes.acepted === false) {
      throw boom.unauthorized();
    }
    const pet = await servicePet.findOne(userPet.petId);
    const adopter = await serviceUser.findOne(petition.userId);
    const adopted = await petition.update({acepted:changes.acepted});
    const mail = {
      from: config.email,
      to: `${adopter.email}`,
      subject: "Petición de adopción aceptada.",
      html: `<p>
        ¡Felicidades ${adopter.name}! Tu petición de adopción para ${pet.name} fue <b>aprobada con éxito<b>.
      </p>`
    }
    const resp1 = await serviceAuth.sendMail(mail);
    return {resp1,adopted,petition};
  }

  async delete(userId,id) { //mandar mail
    const petition = await this.findOne(id);
    const userPet = await serviceUser.findOneUserPet(petition.userPetId);
    if (userPet.userId != userId) {
      throw boom.unauthorized();
    }
    const pet = await servicePet.findOne(userPet.petId);
    const adopter = await serviceUser.findOne(petition.userId);
    const mail = {
      from: config.email,
      to: `${adopter.email}`,
      subject: "Petición de adopción rechazada.",
      html: `<p>
        ¡Lo sentimos ${adopter.name}! Tu petición de adopción para ${pet.name} fue <b>rechazada por el dueño<b>.
      </p>`
    }
    const resp1 = await serviceAuth.sendMail(mail);

    await petition.destroy();
    return { id, resp1 };
  }
}

module.exports = PetitionService;
