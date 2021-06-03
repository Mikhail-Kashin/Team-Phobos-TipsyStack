'use strict';

const faker = require("faker")


module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('CocktailQs', [
    {
      title: "What’s the difference between liquor and liqueur?",
      question: faker.lorem.paragraph(),
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
    title: "What’s the difference between ABV and proof ?",
    question: faker.lorem.paragraph(),
    userId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    },
      {
        title: "What does it mean to order a drink ‘neat’, ‘up’ or ‘on the rocks’?",
        question: faker.lorem.paragraph(),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "What does a highball or lowball drink mean?",
        question: faker.lorem.paragraph(),
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Do different glasses serve a purpose, or are they just for looks?",
        question: faker.lorem.paragraph(),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Do I need to refrigerate alcohol?",
        question: faker.lorem.paragraph(),
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Is it safe to consume egg whites in cocktails?",
        question: faker.lorem.paragraph(),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Is it ‘whiskey’ or ‘whisky?",
        question: faker.lorem.paragraph(),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Should I add water to whiskey?",
        question: faker.lorem.paragraph(),
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "What are bitters?",
        question: faker.lorem.paragraph(),
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "What is a twist?",
        question: faker.lorem.paragraph(),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "What is a ‘chaser’ or a ‘back’?",
        question: faker.lorem.paragraph(),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Should you stir or shake a martini?",
        question: faker.lorem.paragraph(),
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "What does muddle mean?",
        question: faker.lorem.paragraph(),
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "What’s a nightcap?",
        question: faker.lorem.paragraph(),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

]);

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('CocktailQs', null, {
      truncate:true
   });
  }
};
