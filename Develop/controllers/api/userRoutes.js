const router = require('express').Router();
const { User } = require('../../models');

// a function to update the post 
router.post('/updatePost', async (req, res) => {
  try {
    let postId = req.body.postId;
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
