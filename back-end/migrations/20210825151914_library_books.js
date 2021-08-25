
exports.up = function(knex) {
 return knex.schema.createTable('library_books', table => {
    table.increments('id');
    table.string('title');
    table.string('author');
    table.string('isbn');
    table.boolean('checked-in')
 })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('library_books');
  };