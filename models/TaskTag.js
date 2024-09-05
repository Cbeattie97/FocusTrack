const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class TaskTag extends Model {}

TaskTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    task_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'task',
        key: 'id',
        unique: false
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id',
        unique: false
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tasktag',
  }
);

module.exports = TaskTag;