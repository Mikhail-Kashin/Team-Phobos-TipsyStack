'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert("Users", [
    {
      userName: "Demo",
      email: "Demo@demo.com",
      hashedPassword: "Password1!",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userName: "Ugin88",
      email: "ugin88@gmail.com",
      hashedPassword: "Password1!",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userName: "ChurchCleric",
      email: "church_cleric@gmail.com",
      hashedPassword: "Password1!",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userName: "ChiefNal",
      email: "chief-nal@gmail.com",
      hashedPassword: "Password1!",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userName: "MarvelHat",
      email: "b@demo.com",
      hashedPassword: "Password1!",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {
      truncate:true
      });

  }
};
