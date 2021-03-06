const express = require('express');
const router  = express.Router();

const User = require('../models/users.js');

//VIEW SESSION USER
router.get('/', (req, res) => {
  try {
    res.status(200).json({user: req.session.user});
  } catch (e) {
    res.status(400).json({err: e.message});
  }
});

//CREATE SESSION
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({username: req.body.username});

    if (user.auth(req.body.password)) {
      req.session.user = user;
      res.status(200).json(user);
    } else {
      res.status(403).json({err: 'Username or Password do not match.'});
    }
  } catch (e) {
    res.status(400).json({err: e.message});
  }
})

//DESTROY SESSION
router.delete('/logout', (req, res) => {
  console.log('Session is logged out: ', req.session);
  req.session.destroy(() => {
    console.log('session has been destroyed...');
    res.status(200).json({message: 'Session destroyed'});
  });
});

module.exports = router;
