import express from 'express';
import config from './config/dotenv.js';
import cookieParser from 'cookie-parser';
import userTestRouter from './routes/testRoutes/db-test.user.router.js';
import petTestRouter from './routes/testRoutes/db-test.pet.router.js';
import welcomeRouter from './routes/welcome.router.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/user-test', userTestRouter);
app.use('/api/pet-test', petTestRouter);

app.use('/welcome', welcomeRouter);

app.listen(config.port, () => console.log(`Listening on port ${config.port}`));
