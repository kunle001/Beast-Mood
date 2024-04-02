import 'express-async-errors';
import { ConnectOptions } from 'mongoose'
import mongoose from "mongoose";
import { app } from './app';
import dotenv from 'dotenv'

dotenv.config({path: './.env'})
console.log(process.env.MODE)


const start = async () => {
    try {
        await mongoose.connect(process.env.DB!, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        } as ConnectOptions);

        console.log('DB conected')
    } catch (err) {
        console.log(err)
    };
    app.listen(3000, () => {
        console.log("Listening on port 3000");
    });
}

start();