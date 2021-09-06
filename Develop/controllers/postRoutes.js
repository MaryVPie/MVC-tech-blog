const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/newPost', withAuth, async (req, res) => {
    res.render('createPost');
  });
  
  router.get('/updatePost', withAuth, async (req, res) => {
    res.render('updatePost');
  });
  
module.exports = router;