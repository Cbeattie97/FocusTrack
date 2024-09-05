const { TaskTag } = require('../models');

const taskTagData = [
  {
    task_id: 1,
    tag_id: 1,
  },
  {
    task_id: 2,
    tag_id: 2,
  },
  {
    task_id: 3,
    tag_id: 3,
  },
  {
    task_id: 1,
    tag_id: 3,
  },
];

const seedTaskTag = () => TaskTag.bulkCreate(taskTagData);

module.exports = seedTaskTag;