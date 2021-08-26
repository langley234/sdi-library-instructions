exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('library_users').del()
    .then(function () {
      // Inserts seed entries
      return knex('library_users').insert([
        { first_name: 'John', last_name: 'Rambo', username: 'JRambo', password: 'secret' },
        { first_name: 'John', last_name: 'Matrix', username: 'JMatrix', password: 'secret' },
        { first_name: 'Dennis', last_name: 'Rodman', username: 'DRodman', password: 'secret' },
        { first_name: 'John', last_name: 'Denver', username: 'JDenver', password: 'secret' },
        { first_name: 'Rick', last_name: 'Astley', username: 'JRambo', password: 'secret' }
      ]);
    });
};
