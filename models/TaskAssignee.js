const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class TaskAssignee extends Model {}

TaskAssignee.init(
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
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
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
    modelName: 'taskassignee',
  }
);

module.exports = TaskAssignee;