// const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./api/model/user/User');
const session = require('express-session');


app.use(
    session({
        secret: '' ,
        resave: false,
        saveUninitialized: false,
    })
);


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      // Check if the user is already registered
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        // If the user doesn't exist, create a new user
        user = new User({
          googleId: profile.id,
          // Add any other user fields you need here
        });
        await user.save();
      }

      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
