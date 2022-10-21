const { Model, DataTypes } = require("sequelize");
const { PET_TABLE } = require("./pet.model");

const IMAGE_TABLE = "images";

const ImageSchema = {
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
}

class Image extends Model {
  static associate(models) {
    this.belongsTo(models.Pet, {
      as: "pet"
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: IMAGE_TABLE,
      modelName: "Image",
      timestamps: false
    }
  }
}

module.exports = { Image, ImageSchema, IMAGE_TABLE };
