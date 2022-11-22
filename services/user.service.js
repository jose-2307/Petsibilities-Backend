const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const RoleService = require("./role.service");
const { models } = require("./../libs/sequelize");
const { config } = require("./../config/config");
const MessageService = require("./message.service");

const serviceRole = new RoleService();
const serviceMessage = new MessageService();


class UserService {
  constructor(){}

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password:hash
    });
    delete newUser.dataValues.password;
    delete newUser.dataValues.recoveryToken;
    const mail = {
      from: config.email,
      to: `${newUser.email}`,
      subject: `¡${newUser.name}, ya eres parte de nuestra comunidad!`,
      html: `<p>
        Tu cuenta fue creada con éxito, ${newUser.name}.
        <br>
        A partir de ahora podrás registrar a tus mascotas para darlas en adopción o, mediante una petición, postular
        a la adopción de la mascota que desees.
      </p>`
    }
    const resp = await serviceMessage.sendMail(mail);
    return {resp,newUser};
  }

  async find() {
    const users = await models.User.findAll();
    users.forEach(user => {
      delete user.dataValues.password;
    });
    return users;
  }

  async findByEmail(email) {
    const resp = await models.User.findOne({
      where: { email }, include: ["role"]});
    return resp;
  }

  async findOne(id) {
    let user = await models.User.findByPk(id, {
      include: ["role","city","myPet"]
    });
    if(!user) {
      throw boom.notFound("user not found");
    }
    await this.petImages(user.myPet);
    const role = await serviceRole.findOne(user.roleId);
    this.deleteProperty(user,role);
    return user;
  }

  deleteProperty(user, role){
    if (role.name === "Individual") {
      delete user.dataValues.bankAccountNumber;
      delete user.dataValues.bankAccountType;
      delete user.dataValues.bankName;
    }
    if (role.name === "Organization") {
      delete user.dataValues.houseSize;
    }
    delete user.dataValues.password;
    delete user.dataValues.roleId;
    delete user.dataValues.cityId;
  }

  async petImages(petArray){
    for (const pet of petArray) {
      let mypet = await models.Pet.findByPk(pet.id, {
        include: ["images"]
      });
      pet.dataValues.images = mypet.images;
    }
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const resp = await user.update(changes);
    return resp;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }

  //-----------------------UserPet--------------------
  async newPet(userId,data,urls) {
    const newPet = await models.Pet.create(data);
    const myPet = await models.UserPet.create({userId,petId:newPet.id});
    for(const url of urls) {
      await models.Image.create({url,petId:newPet.id});
    }
    return {newPet,myPet};
  }

  async findOneUserPet(id) {
    const up = await models.UserPet.findByPk(id);
    if(!up) {
      throw boom.notFound("user-pet relationship not found");
    }
    return up;
  }
  //-----------------------Score-----------------------
  async createScore(data,myId) {
    if (myId == data.userId) {
      throw boom.conflict("You can't rate yourself.");
    }
    const newScore = await models.Score.create(data);
    return newScore;
  }

  async calculateScore(userId) {
    const scores = await models.Score.findAll({where:{userId}});
    let sum = 0;
    scores.forEach(s => {
      sum += s.score;
    });
    const value = Math.round(sum/scores.length);
    return value;
  }
  //---------------------------------------------------

}

module.exports = UserService;
