import express from "express";
import bodyParser from 'body-parser';
import morgan from 'morgan';
import connectDB from "./config/connection";
import { notFound, errorHandler } from './middlewares/errorHandler.js'
import cors from 'cors';

const app = express();

//============= mongodb connection ============
connectDB();

import movieRouter from './routes/movieRouter.js';

//=========== cors setup ========
app.use(cors({ origin : "*" }));

//============= logger ============
app.use(morgan('dev'));

//================ parser =======
app.use(bodyParser.json());

//============ Routes ========
app.use('/api/v1/',movieRouter);

//============= Error handlers ===========


app.use(notFound);
app.use(errorHandler); 



app.listen(5000,'Server started running on Port 5000');