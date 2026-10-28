import * as authRepository from "../repository/auth.repository.js";
import * as otpRepository from "../repository/otp.repository.js";
import * as userRepository from "../../user/repository/user.repository.js";
import bcrypt from "bcrypt";
import crypto from "crypto"
import {sendEmail} from "../../../common/email/nodemailer.js";
export async function register(userData){
//1. check user existence
 const userExist =await authRepository.checkUserExistByEmail(userData.email);
//2. if yes , throw error
    if (userExist) throw new Error("User already exists");
    //3. if no ,  hash password
    userData.password = await bcrypt.hash(userData.password,10);
    //14.25

    //4.save user into DB
    const createdUser=await authRepository.createUser(userData);
    //5.generate and save otp to db
    const otp= crypto.randomInt(100000,999999).toString();
   await otpRepository.createOTP({
        code:otp,
        email:userData.email,
        expiresAt: new Date(Date.now()+1000*60+5)
    })
    //6. send otp email
    await sendEmail(userData.email,'verification-code',`<h1>Your verification code is ${otp}</h1>`);
   return createdUser;}

// verify the account

async function verifyAccount(email,code){
    //1. check email existence
  const user=await authRepository.checkUserExistByEmail(email);
    //1.1 if the user doesn't exist >> throw an error >> user doesn't exist
    if(!user) throw new Error("User doesn't exist.");
    //1.2 if the account's isVerified = true >> throw an error >> user is already verified
    if(user.isVerified === true) throw new Erorr("user is already verified");
    //2. check otp validation >> TTL and code is correct
   const otp = await otpRepository.getOtpByEmail(email); // {} | null
    //2.1 no otp>>TTL expired >> resend otp
    if(!otp) throw new Error('OTP is expired ,please resend OTP');
    //2.2 code is stored in db,but it is not correct>>invalid otp
    if(otp.code!==code) throw new Error('Invalid code');
    //3. update the isVerified to true
    const updatedUser=await userRepository.updateUserByEmail(email,{isVerified:true})
    //4. delete the otp from the DB
}
