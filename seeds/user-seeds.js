const { User } = require('../models');

const userData = [
  {
    username: 'Shirts',
    password: '123098749'
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
