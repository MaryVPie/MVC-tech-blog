const sequelize = require('../config/connection');
const { Post, User} = require('../models/index');

const userData = require('./userData.json');
const postData = require('./postData.json');

const seedDatabase = async() => {
    await sequelize.sync({ force: true });

    const post = await Post.bulkCreate(postData, {
        individualHooks: true,
        returning: true,
    });
console.log(post)

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
console.log(users)

    process.exit(0);
};

seedDatabase();