const { Model, DataTypes } = require("sequelize");

const REGION_TABLE = "regions";

const RegionSchema = {
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

class Region extends Model {
  static associate(models) {
    this.hasMany(models.City, {
      as: "cities",
      foreignKey: "regionId"
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: REGION_TABLE,
      modelName: "Region",
      timestamps: false
    }
  }
}

module.exports = { Region, RegionSchema, REGION_TABLE };
