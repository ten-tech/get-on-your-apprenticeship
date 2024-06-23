import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import usersRouter from './routes/users.js';
import dummyRouter from './routes/dummy.js';
import realRouter from './routes/real.js';
import errorHandler from './error-handler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../../front/dist')));

app.use('/users', usersRouter);
app.use('/dummy', dummyRouter);
app.use('/real', realRouter); // Utiliser la nouvelle route

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../front/dist/index.html'));
});

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(errorHandler);

export default app;
