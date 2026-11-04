import {AppError} from "../../common/error/error.js";

export const otpIsExpired=new AppError('OTP is expired ,please resend OTP',404);
export const invalidCode=new AppError('Invalid code',400);
export const invalidPassword=new AppError('invalid password',403);