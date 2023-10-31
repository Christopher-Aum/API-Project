'use strict';
const { Spot } = require('../models');
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await Spot.bulkCreate([
    {
      ownerId: 1,
      address: "123 Some Street",
      city: "Jacksonville",
      state: "Florida",
      country: "United States",
      lat: 28.5584733,
      lng: -75.8463983,
      name: "Cozy 3/2 Beachfront Cottage",
      description: "Located in Jacksonville, right by the beach, long walks on the beach is a daily routine!",
      price: 454,
    }
   ])
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
