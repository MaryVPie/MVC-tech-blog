const router = require('express').Router();
const moment = require('moment');
const {toJSON, get} = require('sequelize');
const { User, Post, Comment } = require('../models');


router.get('/', async (req, res) => {
  try {
    
    let posts = await Post.findAll(
      {  
        include: [
          { 
            model: Comment,
            include: [ 
              {
                model: User
              }
            ] 
          },
          { 
            model: User,
            attributes: {
              exclude: ['password'] 
            }
          }
        ]
      });
      
      posts = posts.map((post) => post.get({ plain: true }));


    // console.log('posts:', posts);
    res.render('home', {
      // ...user,
      posts,
      logged_in: req.session?.logged_in ?? false
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
