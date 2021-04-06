const { Pool } = require('pg');

class Database {
  constructor() {
    this.config = {
      // user: 'postgres',
      // host: 'localhost',
      // database: 'postgres',
      // password: 'postgres',
      // port: 5432,
      user: 'lxltbexw',
      host: 'rogue.db.elephantsql.com',
      database: 'lxltbexw',
      password: '9R0YZzeNCvtj4jUgxYGtd9qkHKDzXWC8',
      port: 5432,
    };

    this.pool = new Pool(this.config);
  }

  query(sql) {
    return this.pool.query(sql);
  }

  close() {
    this.pool.end();
  }
}

module.exports = new Database();