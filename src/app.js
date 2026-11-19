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
import {router} from "./route.js";
import {globalErrorHandler} from "./lib/error/error.handler.js";
// loading env variables
// config();

export function createApp(){
    const app = express();
    app.use(cors({origin:'http://localhost:4200'}))

// parse req body buffer -> object
    app.use(express.json());

// routes - map features

app.use('/api',router)
app.use(globalErrorHandler);
    return app;
}

