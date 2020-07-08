const passport = require('passport');
const GoogleStatergy = require('passport-google-oauth20');

const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    });
});

passport.use(
    new GoogleStatergy({
    //options for google statergy
    callbackURL : '/auth/google/redirect',
    clientID :keys.google.clientID,
    clientSecret: keys.google.clientSecret

    }, (accessToken, refreshToken, profile, done) => {
        // passport callback functions
       console.log(profile);
        // check if user exists
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                // user already exists
                console.log('user is' + currentUser);
                done(null, currentUser);
            }else{
                // creating a new user
                new User({
                    username : profile.displayName,
                    googleId : profile.id,
                    thumbnail : profile.photos[0].value
                }).save().then((newUser) => {
                    console.log('New User Created' + newUser);
                    done(null, newUser);
                });
                    }
        });


    })  
);