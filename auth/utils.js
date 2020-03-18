const bcrypt = require('bcrypt');
const knex = require('../db/connection')

function comparePass(userPassword, databasePassword) {
  console.log("we're in comparePass")
  return bcrypt.compareSync(userPassword, databasePassword);
}


function createUser (req) {
  console.log("we're in createUser")

  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return knex('users')
  .insert({
    email: req.body.email,
    password: hash
  })
 // .returning('*');
}


function selectByEmail(email, callback) {
  return this.db.get(
      `SELECT * FROM user WHERE email = ?`,
      [email],function(err,row){
          callback(err,row)
      })
}



module.exports = {
  comparePass,
  createUser,
  selectByEmail
};