const { Model, DataTypes } = require("sequelize");
const { USER_TABLE } = require("./user.model");
const { PET_TABLE } = require("./pet.model");

const USER_PET_TABLE = "users_pets";

const UserPetSchema = {
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
}

class UserPet extends Model {
  static associate(models) {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_PET_TABLE,
      modelName: "UserPet",
      timestamps: false
    }
  }
}

module.exports = { UserPet, UserPetSchema, USER_PET_TABLE };
