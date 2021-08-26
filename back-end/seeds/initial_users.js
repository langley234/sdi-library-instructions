exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('library_users').del()
    .then(function () {
      // Inserts seed entries
      return knex('library_users').insert([
        { first_name: 'John', last_name: 'Rambo', username: 'JRambo', user_authority: 'user', password: 'secret' },
        { first_name: 'John', last_name: 'Matrix', username: 'JMatrix', user_authority: 'librarian', password: 'secret' },
        { first_name: 'Dennis', last_name: 'Rodman', username: 'DRodman', user_authority: 'user', password: 'secret' },
        { first_name: 'John', last_name: 'Denver', username: 'JDenver', user_authority: 'user',password: 'secret' },
        { first_name: 'Rick', last_name: 'Astley', username: 'RAstley', user_authority: 'user', password: 'secret' }
      ]);
    });
};
