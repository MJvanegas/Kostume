import express, { Express } from 'express';
import cors from 'cors';
import { mongoConnect } from './db';
import { router } from './router';
import morgan from 'morgan';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('combined'));

mongoConnect();

router(app);

export default app;
