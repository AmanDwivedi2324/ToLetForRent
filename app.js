import express from 'express';
import { config } from 'dotenv';
import { connectDB } from './databases/db.js';
import { errorMiddleware } from './middlewares/errorMiddlewares.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRouter.js';

config({path:"./config/config.env"})

export const app = express();

//middlewares
app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods:["POST","PUT","DELETE","GET"],
    credentials:true
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

connectDB();


app.use("/api/auth",authRouter);
//error middleware
app.use(errorMiddleware);