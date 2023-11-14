import { config } from '../knexfile';
import knex from 'knex';
const currentEnv: string = process.env.ENVIRONMENT || 'development';
const db = knex(config[currentEnv]);
export default db;
