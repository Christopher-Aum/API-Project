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
    }, {
      ownerId: 2,
      address: "2134 Some Lane",
      city: "Houston",
      state: "Texas",
      country: "United States",
      lat: 54.5545733,
      lng: -81.8465883,
      name: "Warm 2/2 Shack",
      description: "Located in the heart of Houston, downtown is a comfortable stroll away!",
      price: 351,
    }, {
      ownerId: 3,
      address: "291 Not Real Street",
      city: "Cincinnati",
      state: "Ohio",
      country: "United States",
      lat: 65.5541733,
      lng: -42.8431983,
      name: "Large Beachfront Villa",
      description: "Located in Cincinnati, right by the imaginary beach, long walks on the beach is a literal daydream!",
      price: 443,
    }, {
      ownerId: 4,
      address: "1243 Some Road",
      city: "Jacksonville",
      state: "Florida",
      country: "United States",
      lat: 25.5814733,
      lng: -74.8432983,
      name: "Spacious 9/6 Mansion",
      description: "Located in a comfortable suburb of Jacksonville, this mansion has room for your family, and your family's family!",
      price: 959,
    }, {
      ownerId: 5,
      address: "4231 Some Lane",
      city: "Jacksonville",
      state: "Florida",
      country: "United States",
      lat: 29.5524733,
      lng: -74.8643983,
      name: "Cozy 2/2 Shack",
      description: "Located in the outskirts of Jacksonville, this lovely abode is far from the noise of the city!",
      price: 254,
    },
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
