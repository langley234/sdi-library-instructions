
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('library_books').del()
    .then(function () {
      // Inserts seed entries
      return knex('library_books').insert([
        {id: 1, title: 'The Cat in the Hat', author: 'Dr. Seuss', isbn: '1565-613-4564', "checked-in": true},
        {id: 2, title: 'Green Eggs and Ham', author: 'Dr. Seuss', isbn: '150788-613-4564', "checked-in": true},
        {id: 3, title: 'Horton hears a who', author: 'Dr. Seuss', isbn: '14565-613-4564', "checked-in": false}
      ]);
    });
};
