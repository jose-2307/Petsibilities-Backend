const { Model, DataTypes } = require("sequelize");

const SPECIES_TABLE = "species";

const SpeciesSchema = {
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
}

class Species extends Model {
  static associate(models) {
    this.hasMany(models.Breed, {
      as: "breeds",
      foreignKey: "speciesId"
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SPECIES_TABLE,
      modelName: "Species",
      timestamps: false
    }
  }
}

module.exports = { Species, SpeciesSchema, SPECIES_TABLE };
