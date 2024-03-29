import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import dotenv from 'dotenv'
import { errorMiddleware } from './middlewares/error.middleware.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();

app.use(express.json());
app.use((cors({
    origin: '*'
})))

app.use(cookieParser())

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to Database')
}).catch((error) => {
    console.log(error)
});

app.listen(process.env.PORT, () => {
    console.log('Server is running')
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use(errorMiddleware);