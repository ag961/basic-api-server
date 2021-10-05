'use strict';

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
const { Sequelize, DataTypes } = require('sequelize');

let sequelizeOptions = process.env.NODE_ENV === 'production'
  ? {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  }
  : {};

let sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);

const fruits = require('./fruits.js');
const cars = require('./cars.js');

module.exports = {
  db: sequelize,
  Fruits: fruits(sequelize, DataTypes),
  Cars: cars(sequelize, DataTypes),
};

