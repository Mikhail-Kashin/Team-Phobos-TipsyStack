'use strict';
module.exports = (sequelize, DataTypes) => {
  const Votes = sequelize.define('Votes', {
    voteDirection: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    cocktailAId: DataTypes.INTEGER
  }, {});
  Votes.associate = function(models) {
    // associations can be defined here
    // Votes.belongsTo(model.User, {foreignKey: 'userId'});
    // Votes.belongsTo(model.CocktailA, {foreignKey: 'cocktailAId'});
  };
  return Votes;
};
