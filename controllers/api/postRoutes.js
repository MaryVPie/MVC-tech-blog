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


router.put('/:id/newComment', async (req, res) => {
  
  if (!req.session.logged_in) {
    res.status(403).json({message: "You should login first or your are not authorized to access the resource"});
    return;
  }

  console.log(req.body);
  console.log(req.params);
  console.log(req.session);

  let comment = Object.assign({}, req.body);
  comment.post_id = req.params.id;
  comment.user_id = req.session.user_id;
  comment.dateCreated = new Date();

  try {
    let result = await Comment.create(comment);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});


// a function to update the post 
router.patch('/:id', withAuth, async (req, res) => {
  try {
    let postId = req.params.id;
    let userId = req.session.user_id;
    let updatedPost = req.body;
    console.log(updatedPost);

    if (userId == null || !req.session.logged_in) {
      res.status(403);
      return;
    }

    if (postId == null || postId ==0 || postId == '') {
      res.status(404);
      return;
    }

    let post = await Post.findByPk(postId, { raw: true });
    console.log(post);
    post.title = updatedPost.title;
    post.content = updatedPost.content;
    console.log(post);
    let result = await Post.update(post, {
      individualHooks: true,
      where: {
        id: req.params.id
      }
    });
    console.log(result);

    res.status(200).json(result);;
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {

 try {
    let linkedComments = await Comment.findAll({ where: { post_id: req.params.id } });
    let selectedCommentIds = linkedComments.map(com=>com.id);

    await Comment.destroy({ where: { id: selectedCommentIds } });
    let postData = await Post.destroy({
      where: {
        id: req.params.id
      }
    });
    
    if (!postData) {
      res.status(404).json({ message: 'No Post found with this id' });
      return;
    }
    res.json(postData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }

});


module.exports = router;

