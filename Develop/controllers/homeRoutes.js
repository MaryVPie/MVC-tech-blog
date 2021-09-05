const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect('/home');    
    }else {
      res.redirect('/login',302);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
