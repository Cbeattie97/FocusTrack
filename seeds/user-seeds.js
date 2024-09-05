const bcrypt = require('bcrypt');
const User = require('../models/User');

const seedUsers = async () => {
  const users = [
    {
      username: 'alice',
      email: 'alice@example.com',
      password: 'password123',
    },
    {
      username: 'bob',
      email: 'bob@example.com',
      password: 'password123',
    },
    {
      username: 'charlie',
      email: 'charlie@example.com',
      password: 'password123',
    },
  ];

  // Hash the password for each userclear

  for (const user of users) {
    const salt = await bcrypt.genSalt(10);
    user.password_hash = await bcrypt.hash(user.password, salt);
    delete user.password; // Remove plain password before saving
  }

  // Bulk create users with hashed passwords
  await User.bulkCreate(users, {
    individualHooks: true, // Ensure Sequelize runs hooks like hashing password
  });

  console.log('Users seeded successfully!');
};

module.exports = seedUsers;