const bcrypt = require('bcrypt');
const knex = require('../db/connection')

function comparePass(userPassword, databasePassword) {
  console.log("we're in comparePass")
  return bcrypt.compareSync(userPassword, databasePassword);
}


function createUser (req) {
  console.log("we're in createUser")
  // console.log(req)
  console.log(req.body)
  console.log(req.body.username)
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return knex('users')
  .insert({
    username: req.body.username,
    password: hash
  }).catch(err => console.log(err))
 // .returning('*');
}


function selectByUsername(username, callback) {
  return this.knex.get(
      `SELECT * FROM user WHERE username = ?`,
      [username],function(err,row){
          callback(err,row)
      })
}



module.exports = {
  comparePass,
  createUser,
  selectByUsername
};