const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'dpg-cq0p9ruehbks73efiseg-a',
      dialect: 'postgres',
    }
  );

module.exports = sequelize;