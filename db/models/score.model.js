const { Model, DataTypes } = require("sequelize");
const { USER_TABLE } = require("./user.model");

const SCORE_TABLE = "scores";

const ScoreSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  score: {
    type: DataTypes.INTEGER,
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
    onDelete: "SET NULL"
  }
}

class Score extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: "user"
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SCORE_TABLE,
      modelName: "Score",
      timestamps: false
    }
  }
}

module.exports = { Score, ScoreSchema, SCORE_TABLE };
