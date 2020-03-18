const express = require('express')
 
// creating an express instance
const app = express()
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const passport = require('passport')

// getting the local authentication type
const LocalStrategy = require('passport-local').Strategy

const bcrypt = require('bcrypt')

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

// let users = [
//   {
//     id: 1,
//     name: "Jude",
//     email: "user@email.com",
//     password: "password"
//   },
//   {
//     id: 2,
//     name: "Emma",
//     email: "emma@email.com",
//     password: "password2"
//   }
// ]



app.get('/', (req, res, next) => {
  res.send("hello world")
})

/*
app.post('/register', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hashedPassword => {
    return db('user').insert({
      username: req.body.username,
      password_digest: req.body.password
    })
    .returning(['id', 'username'])
    .then(users => {
      res.json(users[0])
    })
    .catch(error => next(error))
  })
})
*/




/*
app.post('/register', function(req, res) {
  console.log("we're in register")
  knex.insert([
    req.body.name,
    req.body.email,
    bcrypt.hashSync(req.body.password, 8)
  ]).asCallback(
  function (err) {
    console.log("we're in register2")
    if (err) return res.status(500).send("There was a problem registering the user.")
    knex.selectByEmail(req.body.email, (err,user) => {
      if (err) return res.status(500).send("There was a problem getting user")
      let token = jwt.sign({ id: user.id }, config.secret, {expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token, user: user });
    });
  });
});
*/



app.post('/register', (req, res, next)  => {
  return authUtils.createUser(req, res)
  .then((response) => {
    console.log('we are in then')
    passport.authenticate('local', (err, user, info) => {
      console.log('we are in register')
      if (user) { console.log("we are fine"); handleResponse(res, 200, 'success'); }
    })(req, res, next);
  })
  .catch((err) => { console.log("we had an error"); handleResponse(res, 500, 'error'); });
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
  res.status(code).json({status: statusMsg});
}


//     if (err) {
//       return next(err);
//     }

//     if (!user) {
//       return res.status(400).send([user, "Cannot log in", info]);
//     }

//     req.login(user, err => {
//       console.log('logged in')
//       res.send("Logged in");
//     });
//   })(req, res, next);
// });

/*
app.get("/api/logout", function(req, res) {
  req.logout();

  console.log("logged out")

  return res.send();
});


const authMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).send('You are not authenticated')
  } else {
    return next()
  }
}


app.get("/api/user", authMiddleware, (req, res) => {
  let user = users.find(user => {
    return user.id === req.session.passport.user
  })

  res.send({ user: user })
})








passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },

    (username, password, done) => {
      let user = users.find((user) => {
        return user.email === username && user.password === password
      })

      if (user) {
        done(null, user)
      } else {
        done(null, false, { message: 'Incorrect username or password'})
      }
    }
  )
)


passport.serializeUser((user, done) => {
  done(null, user.id)
})


passport.deserializeUser((id, done) => {
  knex('user').where({id}).first()
  .then(user) => { done(null, user); })
  .catch((err) => { done(err,null); });

  // let user = users.find((user) => {
  //   return user.id === id
  // })

  // done(null, user)
});
*/



app.listen(3000, () => {
  console.log("Example app listening on port 3000")
})

module.exports = app