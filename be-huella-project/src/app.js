import express from 'express';
import config from './config/dotenv.js';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import petsRouter from './routes/pets.router.js';
import { swaggerSpecs } from './utils/swagger.js';
import { middlewareErrorHandler } from './errors/error-handler.js';
import usersRouter from './routes/users.router.js';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: '*',
    accessControlAllowCredentials: true,
    optionSuccessStatus: 200,
  })
);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);

app.use(middlewareErrorHandler);
app.listen(config.port, () => console.log(`Listening on port ${config.port}`));
