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
    const adopter = await serviceUser.findOne(userId);
    const userPet = await serviceUser.findOneUserPet(userPetId);
    const owner = await serviceUser.findOne(userPet.userId);
    const pet = await servicePet.findOne(userPet.petId);
    const mailToAdopter = {
      from: config.email,
      to: `${adopter.email}`,
      subject: "Petición enviada con éxito.",
      html: `<p>
        Acabas de solicitar la adopción de ${pet.name}. ¡Buena Suerte!
        <br>Por favor <b>espara hasta nuevo aviso</b>, mientras que el dueño evalúa tu petición.
      </p>`
    }
    const mailOwner = {
      from: config.email,
      to: `${owner.email}`,
      subject: "Petición de adopción recibida.",
      html: `<p>
        ¡Hola, ${owner.name}! Acabas de recibir una petición de adopción para ${pet.name}.
        <br><b>Detalle de la petición:</b>
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
