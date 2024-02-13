import express from 'express';
import config from './config/dotenv.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(config.port, () => console.log(`Listening on port ${config.port}`));
