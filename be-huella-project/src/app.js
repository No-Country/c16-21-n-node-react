import express from 'express';
import config from './config/dotenv.js';
import cookieParser from 'cookie-parser';
import userTestRouter from './routes/testRoutes/db-test.users.router.js';
import petTestRouter from './routes/testRoutes/db-test.pets.router.js';
import jwtTestRouter from './routes/testRoutes/db-test.jwt.router.js';
import jwtRouter from './routes/jwt.router.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpecs } from './utils/swagger.js';
import { middlewareErrorHandler } from './errors/error-handler.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/api/user-test', userTestRouter);
app.use('/api/pet-test', petTestRouter);
app.use('/api/token-test', jwtTestRouter);
app.use('/api/login', jwtRouter);


app.use(middlewareErrorHandler);
app.listen(config.port, () => console.log(`Listening on port ${config.port}`));
