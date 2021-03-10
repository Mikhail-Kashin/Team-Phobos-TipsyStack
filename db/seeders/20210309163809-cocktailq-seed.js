'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
    return queryInterface.bulkInsert('CocktailQs', [
    {
      question: "What’s the difference between liquor and liqueur?",
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
    question: "What’s the difference between ABV and proof ?",
    userId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    },
      {
        question: "What does it mean to order a drink ‘neat’, ‘up’ or ‘on the rocks’?", userId: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question: "What does a highball or lowball drink mean?",
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: "Do different glasses serve a purpose, or are they just for looks?",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: "Do I need to refrigerate alcohol?",
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question: "Is it safe to consume egg whites in cocktails?",
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question: "Is it ‘whiskey’ or ‘whisky?",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question: "Should I add water to whiskey?",
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: "What are bitters?",
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question: "What is a twist?",
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question: "What is a ‘chaser’ or a ‘back’?",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question: "Should you stir or shake a martini?",
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question: "What does muddle mean?",
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question: "What’s a nightcap?",
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
