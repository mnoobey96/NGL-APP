// import {config} from 'dotenv';

import'./lib/db/mongoose.js';
import express from 'express';
import authRouter from "./app/auth/auth.route.js";
import userRouter from "./app/user/user.route.js";
import messageRouter from "./app/message/message.route.js";
import {logger} from "./pkg/logger/logger.js";
import cors from 'cors';
// import connectDB from "./lib/db/mongoose.js";
import {OTP} from "./app/auth/model/otp.model.js";
import {env} from "./lib/config/env.js";
// loading env variables
// config();

export function createApp(){
    const app = express();
    app.use(cors({origin:'http://localhost:4200'}))

// parse req body buffer -> object
    app.use(express.json());

// routes - map features
    app.use('/auth', authRouter);
    app.use('/users', userRouter);
    app.use('/message',messageRouter);
// global error handler
    app.use((err, req, res, next)=>{
        logger.error(err.message,err);
        if(err.isOperational===true){
            return res.status(err.statusCode).json({
                message:err.message,
                success:false,
                // stack:err.stack
            });
        }
        return res.status(500).json({
            error:'something went wrong',
            success:false,
        });
    })

    return app;
}

