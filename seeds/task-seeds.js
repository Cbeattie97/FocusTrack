const { Task } = require('../models');

const taskData = [
  {
    title: 'Design homepage',
    description: 'Create homepage layout'
  },
  {
    title: 'Fix bugs',
    description: 'Resolve UI bugs'
  },
  {
    title: 'Testing',
    description: 'Unit tests for new features'
  },
];

const seedTasks = () => Task.bulkCreate(taskData);

module.exports = seedTasks;