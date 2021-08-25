// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : 'pg-database',
      database: 'library',
      user:     'postgres',
      password: 'docker'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
};
