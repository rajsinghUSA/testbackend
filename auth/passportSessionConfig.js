const passport = require('passport');
const knex = require('../db/connection');

module.exports = () => {

  passport.serializeUser((user, done) => {
    console.log("we're in passportSessionConfig1")
    console.log(user)
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log("we're in passportSessionConfig2")
    console.log(id)
    knex('users').where({id}).first()
    .then((user) => { done(null, user); })
    .catch((err) => { done(err,null); });
  });

};
