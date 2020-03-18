const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const init = require('./passportSessionConfig');
const knex = require('../db/connection');
const authUtils = require('./utils')

const options = {};

init();

passport.use(new LocalStrategy(options, (username, password, done) => {
  console.log("we're in passportLocalStrategy")

  // check to see if the username exists
  knex('users').where({ username }).first()
  .then((user) => {
    console.log('within passportstrat')
    if (!user) return done(null, false);
    if (!authUtils.comparePass(password, user.password)) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  })
  .catch((err) => { return done(err); });
}));

module.exports = passport;