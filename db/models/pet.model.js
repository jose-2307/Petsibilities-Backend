const { Model, DataTypes } = require("sequelize");
const { BREED_TABLE } = require("./breed.model");
const { GENDER_TABLE } = require("./gender.model");

const PET_TABLE = "pets";

const PetSchema = {
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
}

class Pet extends Model {
  static associate(models) {
    this.belongsTo(models.Breed, {
      as: "breed",
    });
    this.belongsTo(models.Gender, {
      as: "gender",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PET_TABLE,
      modelName: "Pet",
      timestamps: false
    }
  }
}

module.exports = { Pet, PetSchema, PET_TABLE };
