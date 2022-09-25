const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { config } = require("./../config/config");
const UserService = require("./user.service");
const serviceUser = new UserService();
const RoleService = require("./role.service");
const serviceRole = new RoleService();


class AuthService {

  async login(email, password) {
    const user = await serviceUser.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;
  }



}

module.exports = AuthService;
