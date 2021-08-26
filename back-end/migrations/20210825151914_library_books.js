exports.up = function (knex) {
   console.log('Creating table library_books');
   return knex.schema.createTable('library_books', table => {
      table.increments('book_id');
      table.string('book_title').notNullable();
      table.string('book_sub_title');
      table.string('book_author').notNullable();
      table.string('book_isbn').notNullable();
      table.boolean('book_checked_out')
   })
};

exports.down = function (knex) {
   return knex.schema.dropTableIfExists('library_books');
};