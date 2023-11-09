import { config } from '../knexfile';
import knex from 'knex';
const currentEnv: string = process.env.ENVIRONMENT || 'development';
const db = knex(config[currentEnv]);
console.log('b');
db.raw('SELECT VERSION()')
  .then(() => {
    console.warn(`connection to db successful!`);
  })
  .catch((e) => {
    console.warn('connection to DB is NOT successful!');
  });

export default db;
