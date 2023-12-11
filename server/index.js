import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { authRouter, categoryRouter, productRouter, stripeRouter, userRouter } from './routes/index.js';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

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

app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/categories", categoryRouter)
app.use("/api/products", productRouter)
app.use("/api/checkout", stripeRouter)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
  });