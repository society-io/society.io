var express = require('express');
var router = express.Router();
var passport = require('../auth/passport');


// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/facebook',
    passport.authenticate('facebook', {scope: 'email'})
);

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/', // to be changed to '/dashboard'
    failureRedirect: '/login'
  })
);

module.exports = router;