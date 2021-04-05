const { Pool } = require('pg');

// var conString = "postgres://lxltbexw:9R0YZz...@rogue.db.elephantsql.com:5432/lxltbexw";
// var client = new pg.Client(conString);
// client.connect(function(err) {
//   if(err) {
//     return console.error('could not connect to postgres', err);
//   }
//   client.query('SELECT NOW() AS "theTime"', function(err, result) {
//     if(err) {
//       return console.error('error running query', err);
//     }
//     console.log('connected to db');
//     client.end();
//   });
// });

class Database {
  constructor() {
    this.config = {
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: 'postgres',
      port: 5432,
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