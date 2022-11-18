const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const { config } = require("./../config/config");
const UserService = require("./user.service");
const serviceUser = new UserService();
//const RoleService = require("./role.service");
//const serviceRole = new RoleService();

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

  async signToken(user) {
    //const { name } = await serviceRole.findOne(user.roleId);
    const payload = {
      sub: user.id,
      role: user.role.name,
    };
    const accessToken = jwt.sign(payload, config.jwtSecretLogin, {
      expiresIn: "10min",
    });
    const refreshToken = jwt.sign(payload, config.jwtSecretRefresh, {
      expiresIn: "90min",
    });
    await serviceUser.update(user.id, { refreshToken: refreshToken });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async signRefreshToken(refreshToken) {
    try {
      const payloadRefresh = jwt.verify(refreshToken, config.jwtSecretRefresh);
      const user = await serviceUser.findOne(payloadRefresh.sub);
      if (user.refreshToken !== refreshToken) {
        throw boom.unauthorized();
      }
      const accessToken = jwt.sign(
        { sub: payloadRefresh.sub, role: payloadRefresh.role },
        config.jwtSecretLogin,
        { expiresIn: "10min" }
      );
      return {
        accessToken,
        user,
      };
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async logout(refreshToken) {
    try {
      const payloadRefresh = jwt.verify(refreshToken, config.jwtSecretRefresh);
      const user = await serviceUser.findOne(payloadRefresh.sub);
      if (user.refreshToken !== refreshToken) {
        throw boom.unauthorized();
      }
      await serviceUser.update(user.id, { refreshToken: null });
      return {
        message: "Log out",
      };
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async sendMail(infoMail){
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
          user: config.email,
          pass: config.emailPass,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    await transporter.sendMail(infoMail);
    return { message: "mail sent" };
  }
}


module.exports = AuthService;
