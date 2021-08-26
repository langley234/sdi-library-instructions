exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('library_books').del()
    .then(function () {
      // Inserts seed entries
      return knex('library_books').insert([
        {book_title: 'The Cat in the Hat', book_author: 'Dr. Seuss', book_isbn: '1565-613-4564', book_checked_out: true},
        {book_title: 'Green Eggs and Ham', book_author: 'Dr. Seuss', book_isbn: '150788-613-4564', book_checked_out: false},
        {book_title: 'Horton hears a who', book_author: 'Dr. Seuss', book_isbn: '14565-613-4564', book_checked_out: true},
        {book_title: 'The Bear and the Dragon', book_author: 'Tom Clancy', book_isbn: '039914563X', book_checked_out: false},
        {book_title: 'Ancient Greece', book_author: 'Thomas R. Martin', book_isbn: '780300-084931', book_checked_out: false},
        {book_title: 'Enigma : The Battle for the Code', book_author: 'Hugh Sebag-Montefiore', book_isbn: '978-0-471-49035-7', book_checked_out: false},
        {book_title: `Don't Know Much About the Civil War`, book_author: 'Kenneth C. Davis', book_isbn: '978-0-380-71908-2', book_checked_out: false}
      ]);
    });
};
