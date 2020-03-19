// exports.up = function(knex){
//   return knex.schema.createTable("user", table => {
//      table.increments()
//      table.string("username")
//      table.string("password_digest")
//   })
// }
// exports.down = function(knex){
//   return knex.schema.dropTableIfExists("user")
// }



exports.up = function(knex) {
  console.log('we are in migrations')
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('username').unique().notNullable();
    table.string('password').notNullable();
    table.boolean('admin').notNullable().defaultTo(false);
    // use the following line for SQLite
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now'));
    // use the following line for PostgreSQL:
    // table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
