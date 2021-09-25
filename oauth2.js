const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID =  '655437560854-nf7g7vrd3hgkq8u4fo3udnbd4kv51ie2.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = 'CB6rQ21RFnQVxpJqjY3E8sQA'

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/google/callback",
    proxy: true
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
})

passport.deserializeUser(function(user, done) {
    done(null, user);
})