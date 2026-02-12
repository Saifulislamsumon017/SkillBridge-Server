import express, { Request, Response } from 'express';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';
import { notFound } from './middleware/notFound';
import { errorHandler } from './middleware/errorHandler';
import { env } from './config/env';

const app = express();

app.use(
  cors({
    origin: env.APP_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'SkillBridge API is running',
  });
});

// 404 & Global Error Handler
app.use(notFound);
app.use(errorHandler);

export default app;
