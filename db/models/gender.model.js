const { Model, DataTypes } = require("sequelize");

const GENDER_TABLE = "genders";

const GenderSchema = {
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

class Gender extends Model {
  static associate(models) {
    this.hasMany(models.Pet, {
      as: "pets",
      foreignKey: "genderId"
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: GENDER_TABLE,
      modelName: "Gender",
      timestamps: false
    }
  }
}

module.exports = { Gender, GenderSchema, GENDER_TABLE };
