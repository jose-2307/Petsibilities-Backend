'use strict';
const { ROLE_TABLE } = require("./../models/role.model");
const { GENDER_TABLE } = require("./../models/gender.model");
const { REGION_TABLE } = require("./../models/region.model");


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

    await queryInterface.bulkInsert(REGION_TABLE, [
      {name:"Región de Arica y Parinacota"},{name:"Región de Tarapacá"},{name:"Región de Antofagasta"},{name:"Región de Atacama"},{name:"Región de Coquimbo"},{name:"Región de Valparaíso"},{name:"Región del Libertador General Bernardo O'Higgins"},{name:"Región del Maule"},{name:"Región de Ñuble"},{name:"Región del Biobío"},{name:"Región de La Araucanía"},{name:"Región de Los Ríos"},{name:"Región de Los Lagos"},{name:"Región de Aysén del G. Carlos Ibáñez del Campo"},{name:"Región de Magallanes y de la Antártica Chilena"},{name:"Región Metropolitana de Santiago"},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(ROLE_TABLE, {name: {[Op.in]: ["Admin","Individual","Organization"]}}, {}); //con ,null, elimina todo
    await queryInterface.bulkDelete(GENDER_TABLE, null, {});
    await queryInterface.bulkDelete(REGION_TABLE, null, {});
  }
};
