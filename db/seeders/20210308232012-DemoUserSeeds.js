const bcrypt = require('bcryptjs');
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert("Users", [
    {
      userName: "Demo",
      email: "Demo@demo.com",
      hashedPassword: await bcrypt.hash('Password1',10),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userName: "Ugin88",
      email: "ugin88@gmail.com",
      hashedPassword: await bcrypt.hash('hobaStank_52', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userName: "ChurchCleric",
      email: "church_cleric@gmail.com",
      hashedPassword: await bcrypt.hash('MasterPaster2!', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userName: "ChiefNal",
      email: "chief-nal@gmail.com",
      hashedPassword: await bcrypt.hash('C$Money5', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userName: "MarvelHat",
      email: "b@demo.com",
      hashedPassword: await bcrypt.hash('C@ptainMer1ca',10),
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
