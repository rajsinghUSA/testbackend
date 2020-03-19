const express = require('express')
 
// creating an express instance
const app = express()
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
// const passport = require('passport')
const passport = require('./auth/passportLocalStrategy')

// getting the local authentication type
// const LocalStrategy = require('passport-local').Strategy

// const bcrypt = require('bcrypt')

app.use(bodyParser.json())
app.use(cookieSession({
    name: 'mysession',
    keys: ['vueauthrandomkey'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(passport.initialize());
app.use(passport.session());

// setting up the DB
const knex = require('./db/connection')

// const cors = require('cors')
// app.use(cors())

// const routes = require('routes.js')
const authUtils = require('./auth/utils')


app.get('/', (req, res, next) => {
  res.send("hello world")
})


app.post('/register', (req, res, next)  => {
  return authUtils.createUser(req, res)
  .then((response) => {
    console.log('we are in then')
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
      console.log('success maybe?')
      res.redirect('/');
    }
  })
  .catch((err) => { console.log(err); handleResponse(res, 500, 'error'); });
});



app.post("/api/login", (req, res, next) => {
  console.log('logging in');
  return authUtils.createUser(req, res)
  .then((response) => {
    passport.authenticate("local", (err, user, info) => {
      console.log(user)
      if (user) { handeResponse(res, 200, 'success');}
    })(req, res, next);
  })
.catch((err) => { handleResponse(res, 500, 'error'); });
});

function handleResponse(res, code, statusMsg) {
  console.log('handling the response!')
  res.status(code).json({status: statusMsg});
}



app.listen(3000, () => {
  console.log("Example app listening on port 3000")
})


module.exports = app