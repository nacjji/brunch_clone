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
    username: 'root',
    password: null,
    database: 'brunch_production_db',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
