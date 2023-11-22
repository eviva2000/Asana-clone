import dotenv from 'dotenv';
import db from './config/db-config';
dotenv.config();
import app from './app';

const port = process.env.SERVER_PORT || 5000;

// Establish the database connection before starting the server
db.raw('SELECT VERSION()')
  .then(() => {
    console.warn(`🍭Connection to database successful!`);

    // Start the server after the database connection is established
    app.listen(port, () => {
      console.warn(`⛑ ⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.warn('Connection to the database is NOT successful!', e);
  });
