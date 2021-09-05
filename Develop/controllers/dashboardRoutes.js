const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

// Use withAuth middleware to prevent access to route
router.get('/home', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });
  
      const user = userData.get({ plain: true });
  
      const postData = await Post.findAll()
      const posts = postData
                          .map((post) => post.get({ plain: true }))
                          .map((postN)=> {
                            let newPost = Object.assign({}, postN);
                            newPost.isSelected = newPost.post_id == user.postPostId;
                            return newPost;
                          });
  
      console.log('postN', posts)
      res.render('home', {
        ...user,
        posts,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
});


router.get('/login', async (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/dashboard');    
      return;
    }
    const postData = await Post.findAll()
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('login', {posts});
});

module.exports = router;
