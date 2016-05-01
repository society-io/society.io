var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var facebookAuth = require('./config').facebookAuth;
var User = require('../db/user/userModel');
​
// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
​
// used to deserialize the user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
​
passport.use(
    new FacebookStrategy({ // If server/auth/config.js is missing, add a new one w/ API keys
    clientID: facebookAuth.clientID,
    clientSecret: facebookAuth.clientSecret,
    callbackURL: facebookAuth.callbackURL,
    profileFields: ["id", "displayName", "emails"]
  }, usertoDB));
​
function usertoDB(accessToken, refreshToken, profile, done) {
  process.nextTick(function(){
    User.findOne({fbid: profile.id}, function(err, user){
      if(err) {
        return done(err);
      }
      if(user) {
        return done(null, user);
      } else {
        var newUser = new User();
        newUser.fbid = profile.id;
        newUser.name = profile.displayName;
        newUser.email = profile.emails[0].value;
        newUser.save(function(err){
          if(err) {
            throw err;
          }
          console.log(newUser);
          return done(null, newUser);
        });
      }
    });
  });
}
​
module.exports = passport;