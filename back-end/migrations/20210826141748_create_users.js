exports.up = function (knex) {
    console.log('Creating table library_users')
    return knex.schema.createTable('library_users', table => {
        table.increments('user_id');
        table.string('first_name');
        table.string('last_name');
        table.string('username');
        table.string('password');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('library_users');
};
