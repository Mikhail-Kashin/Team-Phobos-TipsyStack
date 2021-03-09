'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.CocktailQ, {foreignKey: 'userId'});
    // User.hasMany(models.CocktailA, {foreignKey: 'userId'});
    // User.hasMany(model.Vote, {foreignKey: 'userId'});

  };
  return User;
};
