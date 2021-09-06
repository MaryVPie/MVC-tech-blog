const router = require('express').Router();
const moment = require('moment');
const { User, Post, Comment } = require('../models');


router.get('/', async (req, res) => {
  try {
    // Find the logged in user 
    // let user = null;
    // if (req.session?.logged_in && req.session?.user_id) {
    //   const userData = await User.findByPk(req.session.user_id, {
    //     attributes: { exclude: ['password'] },
    //     include: [{ model: Post }],
    //   });
    //   user = userData.get({ plain: true });
    // }
    

    const posts = await Post.findAll(
      {  
        include: [{ model: Comment }, {model: User, attributes: { exclude: ['password'] }}],
        // plain: true,
        raw: true,
        nest: true
      }).map(p => {
        p.dateCreated = moment(p.dateCreated).format("M/D/YYYY");
        return p;
      });

    console.log('posts:', posts);
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
