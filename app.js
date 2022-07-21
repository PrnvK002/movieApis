import express from "express";
import bodyParser from 'body-parser';
import morgan from 'morgan';
import connectDB from "./config/connection.js";
import { notFound, errorHandler } from './middlewares/errorHandler.js'
import cors from 'cors';

import movieRouter from './routes/movieRouter.js';


const app = express();

//============= mongodb connection ============
connectDB();


//=========== cors setup ========
app.use(cors({ origin : "*" }));

//============= logger ============
app.use(morgan('dev'));

//================ parser =======
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//============ Routes ========
app.use('/api/v1/',movieRouter);

//============= Error handlers ===========

app.use(notFound);
app.use(errorHandler); 



app.listen(4000,console.log('Server started running on Port 5000'));