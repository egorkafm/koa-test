const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

class Database {
  constructor() {
    this.config = {
      user: process.env.MY_POSTGRES_DB_USER,
      host: process.env.MY_POSTGRES_DB_HOST,
      database: process.env.MY_POSTGRES_DB_DATABASE,
      password: process.env.MY_POSTGRES_DB_PASSWORD,
      port: process.env.MY_POSTGRES_DB_PORT,
      // user: 'postgres',
      // host: 'localhost',
      // database: 'postgres',
      // password: 'postgres',
      // port: 5432,
      // user: 'lxltbexw',
      // host: 'rogue.db.elephantsql.com',
      // database: 'lxltbexw',
      // password: '9R0YZzeNCvtj4jUgxYGtd9qkHKDzXWC8',
      // port: 5432,
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