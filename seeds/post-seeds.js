const { Post } = require('../models');

const postData = [
  {
    title: 'What is MVC?',
    content: 'Model–view–controller is a software design pattern commonly used for developing user interfaces that divide the related program logic into three interconnected elements.',
    user_id: 1,
    dateCreated: new Date(),
  },

];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
