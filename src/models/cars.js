'use strict';

const Cars = (sequelize, DataTypes) => sequelize.define( 'Cars', {
  make: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING
  }
})

module.exports = Cars;