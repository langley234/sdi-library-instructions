exports.up = function(knex) {
    return knex.schema.createTable('library_checkouts', table => {
       table.increments('id');
       table.string('user-name');
       table.date('checkout-date')
       table.string('checked-out-book')
    })
   };
   
   exports.down = function(knex) {
       return knex.schema.dropTableIfExists('library_checkouts');
     };