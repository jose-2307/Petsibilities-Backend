const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");

const { models } = require("./../libs/sequelize");

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
      where: { email }
    });
    return resp;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id, {
      include: ["role","city","my-pet"]
    });
    if(!user) {
      throw boom.notFound("user not found");
    }
    delete user.dataValues.password;
    return user;
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
}

module.exports = UserService;
