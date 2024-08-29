import express, { Application, Request, Response } from 'express';
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

const test = async (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', test);

app.use(globalErrorHandler);

// Not Found
app.use(notFound);

export default app;
// this is the main file for application