const boom = require("@hapi/boom");

const { models } = require("./../libs/sequelize");

class GenderService {
  constructor(){}

  async create(data) {
    const newGender = await models.Gender.create(data);
    return newGender;
  }

  async find() {
    const genders = await models.Gender.findAll();
    return genders;
  }

  async findOne(id) {
    const gender = await models.Gender.findByPk(id, {
      include: ["pets"]
    });
    if(!gender) {
      throw boom.notFound("gender not found");
    }
    return gender;
  }

  async delete(id) {
    const gender = await this.findOne(id);
    await gender.destroy();
    return { id };
  }
}

module.exports = GenderService;
