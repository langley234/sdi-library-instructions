exports.up = function(knex) {
  console.log('Creating table library_checkouts')
    return knex.schema.createTable('library_checkouts', table => {
       table.increments('checkout_id');
       table.integer('user_id');
       table.integer('book_id');
       table.string('check_out_date');
       table.string('check_in_date');
    })
   };
   
   exports.down = function(knex) {
       return knex.schema.dropTableIfExists('library_checkouts');
     };