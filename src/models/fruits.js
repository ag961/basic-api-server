'use strict';

const Fruits = (sequelize, DataTypes) => sequelize.define( 'Fruits', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING
  }
})

module.exports = Fruits;