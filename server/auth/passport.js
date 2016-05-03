var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var facebookAuth = require('./config').facebookAuth;
var User = require('../db/user/userModel');
var userFBID = null;

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(
    new FacebookStrategy({
    clientID: facebookAuth.clientID,
    clientSecret: facebookAuth.clientSecret,
    callbackURL: facebookAuth.callbackURL,
    profileFields: ["id", "displayName", "emails"]
  }, usertoDB));

function usertoDB(accessToken, refreshToken, profile, done) {
  process.nextTick(function(){
    User.findOne({fbid: profile.id}, function(err, user){
      if(err) {
        return done(err);
      }
      if(user) {
        return done(null, user);
      } else {
       user= new User({
        fbid: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        mmr: 1600,
        wins: 0,
	      losses:0
	      });
        user.save(function(err){
          if(err) {
            throw err;
          }
          // Store this user's fbid to associate it with this user's socket
          userFBID = user.fbid
          return done(null, user);
        });
      }
    });
  });
}

module.exports = {passport: passport, userFBID: userFBID};