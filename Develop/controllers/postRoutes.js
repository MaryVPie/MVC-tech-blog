const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post } = require('../models');

router.get('/newPost', withAuth, async (req, res) => {
    res.render('createPost');
  });
  
  router.get('/updatePost/:id', withAuth, async (req, res) => {
    
    console.log(req.params);
    let post = await Post.findByPk(req.params.id, { raw:true});
    console.log(post);
    res.render('updatePost', { post });
  });
  
module.exports = router;


