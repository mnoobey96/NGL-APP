import jwt from 'jsonwebtoken';
import {toMs} from "../../../common/utlis/time.js";

export function generateToken(){
    return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:toMs(1,'hours')})
}