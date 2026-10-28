import {config} from 'dotenv';

import'./common/db/mongoose.js';
import express from 'express';
import authRouter from "./app/auth/auth.route.js";
import userRouter from "./app/user/user.route.js";
import messageRouter from "./app/message/message.route.js";
// import connectDB from "./common/db/mongoose.js";
import {OTP} from "./app/auth/model/otp.model.js";
config();
const app = express();
// connect to DB
// connectDB();
// parse req body buffer -> object

app.use(express.json());

// routes - map features
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/message',messageRouter);
// global error handler



app.listen(3000,()=> console.log(`Server started on port 3000`));

