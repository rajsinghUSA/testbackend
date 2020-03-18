const environment = process.env.NODE_ENV || 'development';
const config = require("../knexfile")[environment];
const knex = require("knex")(config);




console.log("we're in connection.js")



module.exports = knex