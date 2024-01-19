import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js'
import dotenv from 'dotenv'
dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO).then(() => {
    console.log('COnnected to Database')
}).catch((error) => {
    console.log(error)
});

app.listen(process.env.PORT, () => {
    console.log('Server is running')
});

app.use('/api/user', userRouter);