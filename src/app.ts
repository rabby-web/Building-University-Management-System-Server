import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import notFound from './app/middlwares/notFound';
import globalErrorHandler from './app/middlwares/globalErrorHandler';
import router from './app/routes';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

const getAController = (req: Request, res: Response) => {
  res.send(200);
};

app.get('/', getAController);

app.use(globalErrorHandler);

// Not Found
app.use(notFound);

export default app;
