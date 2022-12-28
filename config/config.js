require('dotenv').config();
module.exports = {
  development: {
    username: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    database: 'brunch_db',
    host: process.env.HOST,
    dialect: 'mysql',
    timezone: '+09:00',
  },
  test: {
    username: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    database: 'brunch_test_db',
    host: process.env.HOST,
    dialect: 'mysql',
    timezone: '+09:00',
  },
  production: {
    username: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    database: 'brunch_test_db',
    host: process.env.HOST,
    dialect: 'mysql',
    timezone: '+09:00',
  },
};
