const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const moment = require('moment');
const withAuth = require('../utils/auth');

// Use withAuth middleware to prevent access to route

router.get('/', withAuth, async (req, res) => {
  
  try {
    const posts = await Post.findAll({ 
      where: { user_id: req.session.user_id },
      include: [{ model: Comment }, {model: User, attributes: { exclude: ['password'] }}],
    }).map(p => p.get({plain: true}));

    console.log(posts);
    res.render('dashboard', {
    // ...user,
        posts,
        logged_in: req.session?.logged_in ?? false
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
    return;
  }
  
});

router.get('/newPost', withAuth, async (req, res) => {
  res.render('createPost');
});

router.get('/updatePost', withAuth, async (req, res) => {
  res.render('updatePost');
});

module.exports = router;
