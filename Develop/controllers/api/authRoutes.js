const router = require('express').Router();
const { User } = require('../../models');

// api method which is creating a new user when he signs up
router.post('/signup', async (req, res) => {
  try {
    let entityToSave = Object.assign({}, req.body);

    const userData = await User.create(entityToSave);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login the user which already has the login and handle the error in case he wrote wrong credentials.
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// logout the user
router.post('/logout', (req, res) => {
  if (req.session) {
    console.log("I passed the log in check!");
    req.session.destroy(() => {
      res.status(204).end();
      console.log("I'm inside destroy");
    });
  } else {
    console.log("IN Not found route");
    res.status(404).end();
  }
});

module.exports = router;
