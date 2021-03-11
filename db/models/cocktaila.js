'use strict';
module.exports = (sequelize, DataTypes) => {
  const CocktailA = sequelize.define('CocktailA', {
    answer: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    cocktailQId: DataTypes.INTEGER
  }, {});
  CocktailA.associate = function(models) {
    // associations can be defined here
    CocktailA.belongsTo(models.User, { foreignKey: 'userId'});
    CocktailA.belongsTo(models.CocktailQ, { foreignKey: 'cocktailQId'});
    CocktailA.hasMany(models.Vote, {foreignKey: 'cocktailAId'});
  };
  return CocktailA;
};
