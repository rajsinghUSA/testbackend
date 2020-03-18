const bcrypt = require('bcrypt');
const knex = require('../db/connection')

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}


function createUser (req) {
  console.log("we're in createUser")

  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return knex('users')
  .insert({
    username: req.body.username,
    password: hash
  })
  .returning('*');
}

module.exports = {
  comparePass,
  createUser
};