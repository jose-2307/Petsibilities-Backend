const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const RoleService = require("./role.service");
const { models } = require("./../libs/sequelize");

const serviceRole = new RoleService;

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
    return newUser;
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
    const user = await models.User.findByPk(id, {
      include: ["role","city","myPet"]
    });
    if(!user) {
      throw boom.notFound("user not found");
    }
    const role = await serviceRole.findOne(user.roleId);
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
    return user;
  }

  //-----------------------UserPet--------------------
  async newPet(data) {
    const myPet = await models.UserPet.create(data);
    return myPet;
  }

  async findOneUserPet(id) {
    const up = await models.UserPet.findByPk(id)
    if(!up) {
      throw boom.notFound("user-pet relationship not found");
    }
    return up;
  }
  //--------------------------------------------------
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

}

module.exports = UserService;
