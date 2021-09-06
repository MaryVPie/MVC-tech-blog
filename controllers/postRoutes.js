const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post, Comment } = require('../models');

router.get('/newPost', withAuth, async (req, res) => {
  res.render('createPost');
});

router.get('/updatePost/:id', withAuth, async (req, res) => {

  console.log(req.params);
  let post = await Post.findByPk(req.params.id, { raw: true });
  console.log(post);
  res.render('updatePost', { post });
});


router.get('/newComment', async (req, res) => {
  console.log(req.session);
  if (req.session.logged_in == null || !req.session.logged_in) {
    res.status(401).json({message: "You should login first or your are not authorized to access the resource"});
    return;
  }
  res.render('newComment',{ noLayout: true });
});


module.exports = router;


