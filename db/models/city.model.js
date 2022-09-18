const { Model, DataTypes } = require("sequelize");
const { REGION_TABLE } = require("./region.model");

const CITY_TABLE = "cities";

const CitySchema = {
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
}

class City extends Model {
  static associate(models) {
    this.belongsTo(models.Region, {
      as: "region",
    });

    this.hasMany(models.User, {
      as: "users",
      foreignKey: "cityId"
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CITY_TABLE,
      modelName: "City",
      timestamps: false
    }
  }
}

module.exports = { City, CitySchema, CITY_TABLE };
