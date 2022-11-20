'use strict';
const { ROLE_TABLE } = require("./../models/role.model");
const { GENDER_TABLE } = require("./../models/gender.model");

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert(ROLE_TABLE, [
      {
        name: "Admin",
      },
      {
        name: "Individual",
      },
      {
        name: "Organization",
      }
    ], {});

    await queryInterface.bulkInsert(GENDER_TABLE, [
      {
        name: "Macho",
      },
      {
        name: "Hembra",
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(ROLE_TABLE, {name: {[Op.in]: ["Admin","Individual","Organization"]}}, {}); //con ,null, elimina todo
    await queryInterface.bulkDelete(GENDER_TABLE, null, {});
  }
};
