'use strict';
const {Review} = require('../models')
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 3,
        userId: 1,
        review: "Seemed fake, but it was an enjoyable and surprising stay!",
        stars: 4
      },{
        spotId: 1,
        userId: 3,
        review: "Seemed like a dream, would always recommend another stay!",
        stars: 5
      },{
        spotId: 2,
        userId: 2,
        review: "Was close to downtown traffic, but it was a comfortable stay",
        stars: 4
      },{
        spotId: 4,
        userId: 1,
        review: "So spacious, I almost got lost inside, and it had a beautiful view!",
        stars: 5
      },{
        spotId: 5,
        userId: 2,
        review: "It was too far to really do anything short in the city, but it has an odd charm to it",
        stars: 3
      }
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
