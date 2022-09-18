const { Model, DataTypes } = require("sequelize");
const { ROLE_TABLE } = require("./role.model");
const { CITY_TABLE } = require("./city.model");

const USER_TABLE = "users";

const UserSchema = {
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
  bankAccount: {
    field: "bank_account",
    type: DataTypes.STRING,
    unique: false,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
    defaultValue: 5
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
    defaultValue: 1,
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
};

class User extends Model {
  static associate(models) {
    this.belongsTo(models.Role, {
      as: "role",
    });

    this.belongsTo(models.City, {
      as: "city",
    });
    this.belongsToMany(models.Pet, {
      as: "my-pet",
      through: models.UserPet,
      foreignKey: "userId",
      otherKey: "petId"
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      timestamps: false
    }
  }
}

module.exports = { User, UserSchema, USER_TABLE };
