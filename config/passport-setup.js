const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const InstagramStrategy = require('passport-instagram')
const keyValues = require('./keys')
const User = require('../models/user-model')

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new InstagramStrategy({
        // options for google strategy
        clientID: keyValues.instagram.clientID,
        clientSecret: keyValues.instagram.clientSecret,
        callbackURL: '/auth/instagram/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        console.log(accessToken, ' : is the access token')
        // console.log(profile, ' : is the profile information')
        // console.log(profile, ' : is the profile information')
        User.findOne({userId: profile.provider+profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                // console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new User({
                    userId: profile.provider+profile.id,
                    username: profile.displayName,
                    thumbnail: profile._json.data.profile_picture
                }).save().then((newUser) => {
                    // console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    })
);
passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keyValues.google.clientID,
        clientSecret: keyValues.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        User.findOne({userId: profile.provider+profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                // console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new User({
                    userId: profile.provider+profile.id,
                    username: profile.displayName,
                    thumbnail: profile._json.image.url
                }).save().then((newUser) => {
                    // console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    })
);
