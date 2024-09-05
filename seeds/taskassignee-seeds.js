const { TaskAssignee } = require('../models');

const taskAssigneeData = [
  {
    task_id: 1,
    user_id: 1,
  },
  {
    task_id: 1,
    user_id: 2,
  },
  {
    task_id: 2,
    user_id: 2,
  },
  {
    task_id: 2,
    user_id: 3,
  },
  {
    task_id: 3,
    user_id: 3,
  },
];

const seedTaskAssignee = () => TaskAssignee.bulkCreate(taskAssigneeData);

module.exports = seedTaskAssignee;