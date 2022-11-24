const boom = require("@hapi/boom");
const { config } = require("./../config/config");

function checkRole(...roles) {
  return (req,res,next) => {
    const user = req.user;
    if (roles.includes(user.role)){
      next();
    } else {
      next(boom.forbidden("Admin permissions required"));
    }
  }
}

function checkApiKey(req,res,next) {
  const apiKey = req.headers["api"];
  if (!apiKey) next(boom.unauthorized());
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized()); //no está autorizado para hacer peticiones
  }
}

module.exports = {checkRole, checkApiKey};
