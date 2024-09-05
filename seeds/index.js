const seedTags = require('./tag-seeds');
const seedTasks = require('./task-seeds');
const seedUsers = require('./user-seeds');
const seedTaskAssignee = require('./taskassignee-seeds');
const seedTaskTag = require('./tasktag-seeds')

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  
  await seedTags();
  console.log('\n----- TAGS SEEDED -----\n');

  await seedTasks();
  console.log('\n----- TASKS SEEDED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedTaskAssignee();
  console.log('\n----- TASK ASSIGNEES SEEDED -----\n');

  await seedTaskTag();
  console.log('\n----- TASK TAGS SEEDED -----\n');

  process.exit(0);
};

seedAll();