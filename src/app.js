import'./lib/db/mongoose.js';
import express from 'express';
import cors from 'cors';
import {router} from "./route.js";
import {globalErrorHandler} from "./lib/error/error.handler.js";
import {correlationId} from "./lib/correlation/correlationId.js";
import cookieParser from "cookie-parser";

export function createApp(){
    const app = express();
    app.use(cors({origin:'http://localhost:4200'}))
// parse req body buffer -> object
    app.use(express.json());
    // parsing cookie
    app.use(cookieParser());

    app.use(correlationId);

    app.use('/api',router)
    app.use(globalErrorHandler);

        return app;
}

