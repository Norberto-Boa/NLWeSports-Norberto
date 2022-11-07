import "express-async-errors";
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import { router } from './useCases/routes';
import cookieParser from 'cookie-parser';


const app = express();

app.use(express.json());

app.use(cors());

app.use(cookieParser());

app.use(router);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  return res.json({
    status: "Error",
    message: error.message
  })
})



app.listen(4444) 