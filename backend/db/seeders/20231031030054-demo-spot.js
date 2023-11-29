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
      ownerId: 1,
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
      ownerId: 2,
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
    {
      ownerId: 2,
      address: "4213 Some Circle",
      city: "Tampa",
      state: "Florida",
      country: "United States",
      lat: 29.5524733,
      lng: -54.8643983,
      name: "Cozy 2/1 Shack",
      description: "Located in the heart of Tampa, this lovely abode is at the center of Tampa!",
      price: 213,
    },
    {
      ownerId: 3,
      address: "4341 Some Lane",
      city: "Miami",
      state: "Florida",
      country: "United States",
      lat: 24.5524733,
      lng: -76.8643983,
      name: "Comfortable 4/3 Home",
      description: "Located in the suburbs of Miami, it exists as a happy medium of city life, and the quiet life!",
      price: 457,
    },
    {
      ownerId: 1,
      address: "431 Some Road",
      city: "Jacksonville",
      state: "Florida",
      country: "United States",
      lat: 25.5524733,
      lng: -75.8643983,
      name: "Cozy 2/2 Villa",
      description: "Located in the suburbs of Jacksonville, this lovely abode lives at the comfortable range of city and rural!",
      price: 356,
    },
    {
      ownerId: 3,
      address: "231 Some Lane",
      city: "Jacksonville",
      state: "Florida",
      country: "United States",
      lat: 26.5524733,
      lng: -74.8643983,
      name: "Cozy 4/2 Home",
      description: "Located in the outskirts of Jacksonville, this lovely home sits away from the noisy bustle of the city!",
      price: 258,
    },{
      ownerId: 3,
      address: "4214 Some Lane",
      city: "Tampa",
      state: "Florida",
      country: "United States",
      lat: 25.5524733,
      lng: -77.8643983,
      name: "Cozy 2/2 Shack",
      description: "Located in the outskirts of Tampa, this lovely shack has a lovely beach to greet you everytime you come home!",
      price: 244,
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
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      lat: {[Op.in]: [28.5584733, 54.5545733, 65.5541733, 25.5814733, 29.5524733, 24.5524733, 26.5524733, 25.5524733]}
    })
  }
};
