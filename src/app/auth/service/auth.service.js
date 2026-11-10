import * as authRepository from "../repository/auth.repository.js";
import * as otpRepository from "../repository/otp.repository.js";
import * as userRepository from "../../user/repository/user.repository.js";
import {sendEmail} from "../../../common/email/nodemailer.js";
import {toMs} from "../../../common/utlis/time.js";
import {
    invalidCode, invalidPassword,
    otpIsExpired
} from "../errors.js";
import {userAlreadyExists, userAlreadyVerified, userIsNotVerified, userNotExist} from "../../user/errors.js";
import {deleteOTPsByEmail} from "../repository/otp.repository.js";
import {generateOTPCode} from "../../../common/utlis/otp.js";
import {generateToken} from "../utlis/token.js";
import {comparePassword, hashPassword} from "../utlis/hash.js";
import bcrypt from 'bcrypt';


export async function register(userData){
//1. check user existence
 const userExist =await authRepository.checkUserExistByEmail(userData.email);
//2. if yes , throw error

    if (userExist) throw userAlreadyExists;
    //3. if no ,  hash password
    userData.password = await hashPassword(userData.password)
    //14.25
    //4.save user into DB
    const createdUser=await authRepository.createUser(userData);

    //5.generate and save otp to db
    const code= generateOTPCode();
   await otpRepository.createOTP({
        code:code,
        email:userData.email,
        expiresAt: new Date(Date.now()+toMs(5,'minutes'))
    })
    //6. send otp email
    await sendEmail(userData.email,'verification-code',`<h1>Your verification code is ${code}</h1>`);
   return createdUser;}

// verify the account

export async function verifyAccount(email,code){
    //1. check email existence
  const user=await authRepository.checkUserExistByEmail(email);
    //1.1 if the user doesn't exist >> throw an error >> user doesn't exist
    if(!user) throw userNotExist;
    //1.2 if the account's isVerified = true >> throw an error >> user is already verified
    if(user.isVerified === true) throw userAlreadyVerified;
    //2. check otp validation >> TTL and code is correct
   const otp = await otpRepository.getOtpByEmail(email); // {} | null
    //2.1 no otp>>TTL expired >> resend otp
    if(!otp) throw otpIsExpired;
    //2.2 code is stored in db,but it is not correct>>invalid otp
    if(otp.code!==code) throw invalidCode;
    //3. update the isVerified to true
    const updatedUser=await userRepository.updateUserByEmail(email,{isVerified:true})
    //4. delete the otp from the DB
    await otpRepository.deleteOTPsByEmail(email);
    return updatedUser;
}

// login

export async function login(email,password){
    //1.check user existence
  const user=  await authRepository.checkUserExistByEmail(email);
    //1.1 not found >> throw error
    if(!user)throw userNotExist;
    //1.2 not verified >> throw error must verify
    if(user['isVerified']===false)throw userIsNotVerified;
    //2.if found we compare password
    const match=await comparePassword(password,user['password']);
    if(!match)throw invalidPassword;
    // 3.if true then generate access token
    return generateToken({id:user._id,name:user.name});
}

// forget password
//s1 send otp >> s2 reset password

export async function sentOtp(email){
    //1.check email existence
 const user=await authRepository.checkUserExistByEmail(email);
 if(!user)throw userNotExist;
    //2.delete al old otpS
    await otpRepository.deleteOTPsByEmail(email);
    //3.generate otp and store it into db
    const code = generateOTPCode();
   await otpRepository.createOTP({
        code:code,
        email:email,
        expiresAt: Date.now()+toMs(3,'minutes')
    })
    //4.send the otp to email
    await sendEmail(email,'new otp',`<p>your new otp is ${code}</p>`);
}

export async function resetPassword(email,code,newPassword){
    //1.verify otp code
    const otp = await otpRepository.getOtpByEmail(email);
    if(!otp)throw otpIsExpired;
    if(otp.code!==code) throw invalidCode;
    //2.hashpassowrd
    const hashedPassword=await hashPassword(newPassword);
    //3.update user password
await userRepository.updateUserByEmail(email,{password:newPassword});
//4.delete otp
 await otpRepository.deleteOTPsByEmail(email);
}

