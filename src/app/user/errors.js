import {AppError} from "../../common/error/error.js";

export const userNotExist = new AppError("User doesn't exist.",404);
export const userAlreadyExists = new AppError("User already exists",409);
export const userAlreadyVerified = new AppError("user is already verified",400);
export const userIsNotVerified = new AppError("User is not verified",403);