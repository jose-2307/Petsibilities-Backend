const { Model, DataTypes, Sequelize } = require("sequelize");
const { USER_TABLE } = require("./user.model");
const { USER_PET_TABLE } = require("./user-pet.model");

const PETITION_TABLE = "petitions";

const PetitionSchema = {
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
  accepted: {
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
}

class Petition extends Model {
  static associate(models) {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PETITION_TABLE,
      modelName: "Petition",
      timestamps: false
    }
  }
}

module.exports = { Petition, PetitionSchema, PETITION_TABLE };
