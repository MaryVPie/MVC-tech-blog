const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.put('/', withAuth, async (req, res) => {
  console.log(req.body);
  console.log(req.session);
  // how to merge 2 objects with different props into a new one with union of those.
  let post = Object.assign({}, {
    dateCreated: new Date(),
    user_id: req.session.user_id
  }, req.body);
  // Or we can do like that: 
  // let post = Object.assign({}, req.body);
  // post.user_id = req.session.user_id;
  // post.dateCreated = new Date();
  try {
    let result = await Post.create(post);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});




// a function to update the post 
router.patch('/:id', withAuth, async (req, res) => {
  try {
    let postId = req.re.postId;
    let userId = req.session.user_id;

    if (userId == null || !req.session.logged_in) {
      res.status(403);
      return;
    }

    if (postId == '') {
      postId = null;
    }

    let user = await User.findByPk(req.session.user_id);
    
    await user.update({postPostId:postId})
    res.status(200);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;
