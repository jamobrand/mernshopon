const router = require('express').Router();

const User = require('../models/user');

/* Post/Create New User */
router.post('/api/user/signup', (req, res, next) => {
  let user = new User();
  user.email = req.body.email;
  user.password = req.body.password;
  user.profile.photo = user.gravatar();

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (existingUser) {
      res.json({
        success: false,
        message: 'Email Exists'
      });
    } else {
      user.save();
      //console.log(user)

      res.json({
        success: true,
        message: 'User Created'
      });
    }
  });
});

router.post('/api/user/login', (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.json({
        success: false,
        message: 'Auth Failed, User not Found'
      });
    } else if (user) {
      var validPassword = user.comparePassword(req.body.password);
      if (!validPassword) {
        res.json({
          message: 'Auth Failed, Wrong Password'
        });
      } else {
        res.json({
          success: true,
          message: 'User Logged In'
        });
      }
    }
  });
});

module.exports = router;
