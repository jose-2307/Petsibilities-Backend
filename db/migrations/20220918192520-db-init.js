'use strict';
const { DataTypes } = require("sequelize");

const { ROLE_TABLE } = require("./../models/role.model");
const { REGION_TABLE } = require("./../models/region.model");
const { CITY_TABLE } = require("./../models/city.model");
const { USER_TABLE } = require("./../models/user.model");
const { SPECIES_TABLE } = require("./../models/species.model");
const { BREED_TABLE } = require("./../models/breed.model");
const { GENDER_TABLE } = require("./../models/gender.model");
const { PET_TABLE } = require("./../models/pet.model");
const { USER_PET_TABLE } = require("./../models/user-pet.model");
const { IMAGE_TABLE } = require("./../models/image.model");
const { PETITION_TABLE } = require("./../models/petition.model");
const { SCORE_TABLE } = require("./../models/score.model");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(ROLE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    });
    await queryInterface.createTable(REGION_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    });
    await queryInterface.createTable(CITY_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      regionId: {
        field: "region_id",
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: REGION_TABLE,
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      }
    });
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      bankAccountNumber: {
        field: "bank_account_number",
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      bankAccountType: {
        field: "bank_account_type",
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
      },
      bankName: {
        field: "bank_name",
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
      },
      houseSize: {
        field: "hose_size",
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: true,
      },
      urlImage: {
        field: "url_image",
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
      },
      phoneNumber: {
        field: "phone_number",
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      refreshToken: {
        field: "refresh_token",
        allowNull: true,
        type: DataTypes.STRING
      },
      recoveryToken: {
        field: "recovery_token",
        allowNull: true,
        type: DataTypes.STRING
      },
      roleId: {
        field: "role_id",
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: ROLE_TABLE,
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      cityId: {
        field: "city_id",
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: CITY_TABLE,
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
    });
    await queryInterface.createTable(SCORE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      score: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
      },
      userId: {
        field: "user_id",
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: USER_TABLE,
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      }
    });
    await queryInterface.createTable(SPECIES_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    });
    await queryInterface.createTable(BREED_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      speciesId: {
        field: "species_id",
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: SPECIES_TABLE,
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      }
    });
    await queryInterface.createTable(GENDER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    });
    await queryInterface.createTable(PET_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
      },
      size: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
      },
      wormed: {
        type: DataTypes.BOOLEAN,
        unique: false,
        allowNull: false,
        defaultValue: false
      },
      adopted: {
        type: DataTypes.BOOLEAN,
        unique: false,
        allowNull: false,
        defaultValue: false
      },
      sterilized: {
        type: DataTypes.BOOLEAN,
        unique: false,
        allowNull: false,
        defaultValue: false
      },
      genderId: {
        field: "gender_id",
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: GENDER_TABLE,
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },

      breedId: {
        field: "breed_id",
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: BREED_TABLE,
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      }
    });
    await queryInterface.createTable(IMAGE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      url: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      petId: {
        field: "pet_id",
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: PET_TABLE,
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      }
    });
    await queryInterface.createTable(USER_PET_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      date: {
        type: DataTypes.DATEONLY,
        unique: false,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      userId: {
        field: "user_id",
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: USER_TABLE,
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      petId: {
        field: "pet_id",
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: PET_TABLE,
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
    });
    await queryInterface.createTable(PETITION_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique:true,
        //primaryKey: true,
        type: DataTypes.INTEGER
      },
      comment: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        unique: false,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      acepted: {
        type: DataTypes.BOOLEAN,
        unique: false,
        allowNull: true
      },
      userId: {
        field: "user_id",
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: USER_TABLE,
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      userPetId: {
        field: "user_pet_id",
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: USER_PET_TABLE,
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable(PETITION_TABLE);
    await queryInterface.dropTable(USER_PET_TABLE);
    await queryInterface.dropTable(IMAGE_TABLE);
    await queryInterface.dropTable(PET_TABLE);
    await queryInterface.dropTable(GENDER_TABLE);
    await queryInterface.dropTable(BREED_TABLE);
    await queryInterface.dropTable(SPECIES_TABLE);
    await queryInterface.dropTable(SCORE_TABLE);
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CITY_TABLE);
    await queryInterface.dropTable(REGION_TABLE);
    await queryInterface.dropTable(ROLE_TABLE);
  }
};
