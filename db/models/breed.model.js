const { Model, DataTypes } = require("sequelize");
const { SPECIES_TABLE } = require("./species.model");

const BREED_TABLE = "breeds";

const BreedSchema = {
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
}

class Breed extends Model {
  static associate(models) {
    this.belongsTo(models.Species, {
      as: "species",
    });

    this.hasMany(models.Pet, {
      as: "pets",
      foreignKey: "breedId"
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: BREED_TABLE,
      modelName: "Breed",
      timestamps: false
    }
  }
}

module.exports = { Breed, BreedSchema, BREED_TABLE };
