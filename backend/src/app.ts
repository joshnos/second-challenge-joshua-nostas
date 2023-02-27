import bodyParser from 'body-parser';
import cors from 'cors';
import express, {Request, Response} from 'express';
import { Routes } from './routes';
import { AppDataSource } from './utils/data-source';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../env/.env') });

AppDataSource.initialize().then(async () => {

  // create express app
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  // register express routes from defined application routes
  Routes.forEach(route => {
      (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
          const result = (new (route.controller as any))[route.action](req, res, next)
          if (result instanceof Promise) {
              result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

          } else if (result !== null && result !== undefined) {
              res.json(result)
          }
      });
  });

  // start express server
  app.listen(3001)

  console.log("Express server has started on port 3001. Open http://0.0.0.0:3001/posts to see results")

}).catch(error => console.log(error))