const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
        clientID: '536713925179-e16efo89r4nl4doh69cfa6f1oddi5fv0.apps.googleusercontent.com',
        clientSecret: 'Ysnljla4AP5OHCgLNyQCI2cD',
        callbackURL: "http://localhost:5000/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);

    }
));