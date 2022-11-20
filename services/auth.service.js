const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const MessageService = require("./message.service");
const { config } = require("./../config/config");
const UserService = require("./user.service");
const serviceUser = new UserService();
const serviceMessage = new MessageService();

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

  async sendRecovery(email){
    const user = await serviceUser.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = { sub:user.id };
    const token = jwt.sign(payload, config.jwtSecretRecovery, {expiresIn: "15min"});
    const uri = `http://${config.recoveryUri}/recovery?token=${token}`;
    await serviceUser.update(user.id,{recoveryToken: token});
    const mail = {
      from: config.email,
      to: `${user.email}`,
      subject: "Restablecer contraseña",
      html: `<p>Hola, ${user.name}:
      <br>
      <br>
      Hemos recibido una solicitud de cambio de contraseña. Ingresa al siguiente link, de 15 minutos de duración, para <b>restablecer tu contraseña:</b> <a target="_blank" href=${uri}>restablecer</a>
      <br>
      <br>
      Si no has solicitado este link, puede que alguien esté intentando acceder a tu cuenta. <b>No reenvíes este mail ni des el link a nadie.<b/>
      <br>
      <br>
      Atentamente,
      <br>
      El equipo de Petsibilities
      </p>`
    }
    const resp = await serviceMessage.sendMail(mail);
    return resp;
  }

  async changePassword(token, newPassword){
    try {

      const payload = jwt.verify(token,config.jwtSecretRecovery);
      const user = await serviceUser.findOne(payload.sub);
      if (token !== user.recoveryToken) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await serviceUser.update(user.id,{password: hash, recoveryToken: null});
      return { message: "Password changed" }
    } catch (error) {
      throw boom.unauthorized();
    }
  }
}


module.exports = AuthService;
