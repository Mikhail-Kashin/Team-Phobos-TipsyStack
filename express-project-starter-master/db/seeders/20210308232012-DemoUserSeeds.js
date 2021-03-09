'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert('Users', [
    {userName:'Demo', email:'Demo@demo.com', hashedPassword:'Password1!', createdAt:new Date(), updatedAt:new Date()}
  ])
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});

  }
};
