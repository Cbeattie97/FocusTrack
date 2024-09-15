// Sequelize connection to the database
const Sequelize = require('sequelize');
require('dotenv').config();

// Create a new Sequelize instance
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL,{ssl:false})
  : new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres', 
    }
  );

  // Export the connection
module.exports = sequelize;
