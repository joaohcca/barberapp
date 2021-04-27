import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import uploadConfig from '@config/upload'
import AppError from '@shared/errors/appError';
import routes from './routes';

import '@shared/infra/typeorm';

const app = express();
app.use(cors());
app.use('/files', express.static(uploadConfig.directory))
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      mesage: err.message,
    })
  }

  console.log(err)

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
})
app.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});
