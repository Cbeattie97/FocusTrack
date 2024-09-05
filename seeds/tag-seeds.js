const { Tag } = require('../models');

const tagData = [
  {
    name: 'Frontend'
  },
  {
    name: 'Backend'
  },
  {
    name: 'Testing'
  },
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;