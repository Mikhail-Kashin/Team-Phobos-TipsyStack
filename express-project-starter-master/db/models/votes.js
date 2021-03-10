'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    voteDirection: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    cocktailAId: DataTypes.INTEGER
  }, {});
  Vote.associate = function(models) {
    // associations can be defined here
    Vote.belongsTo(models.User, {foreignKey: 'userId'});
    Vote.belongsTo(models.CocktailA, {foreignKey: 'cocktailAId'});
  };
  return Vote;
};
