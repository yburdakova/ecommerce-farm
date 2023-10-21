import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { userRoute, authRouter } from './routes/index.js';


dotenv.config();
const app = express();

mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>{
        console.log('Mongo DB is connected successfully');
    })
    .catch(err => {
        console.log(err.message);
    });

app.listen(process.env.PORT || 5555, ()=> {
    console.log('Backend server is running');
});

app.use(express.json());

app.use("/api/users", userRoute)
app.use("/api/auth", authRouter)
