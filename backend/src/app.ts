import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes';
import path from 'path';

const app: Express = express();

const uiBuildPath = path.join(__dirname, '../../frontend/build/');
app.use(express.static(uiBuildPath));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);

if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw 'API_PATH is not set. Remember to set it in your .env file';
}

app.use('*', (req: Request, res: Response) => {
  res.sendFile(path.join(`${uiBuildPath}/index.html`));
});

export default app;
