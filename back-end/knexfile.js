// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'library',
      user:     'postgres',
      password: 'docker'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
};
