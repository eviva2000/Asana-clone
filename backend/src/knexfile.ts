require('dotenv').config();
export const config: Record<string, any> = {
  development: {
    client: 'postgres',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
  production: {
    client: 'postgres',
    connection: {
      host: process.env.PROD_DB_HOST,
      database: process.env.PROD_DB,
      user: process.env.PROD_DB_USER,
      password: process.env.PROD_DB_PASSWORD,
      port: process.env.PROD_DB_PORT,
      ssl: true,
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
