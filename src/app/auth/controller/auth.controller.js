import * as authService from '../service/auth.service.js';
import {toMs} from "../../../pkg/utlis/time.js";
import {validateBody} from "../../../lib/validation/validation.js";
import {loginDTO, registerDTO, resetPasswordDTO, sendDTO, verifyAccountDTO} from "../dto/auth.dto.js";
import {auth} from "google-auth-library";

export async function register (req,res,next){

    try{
        // layer of validation
      const data=  validateBody(registerDTO,req.body)
       const createdUser=await authService.register(data);
       res.status(201).json({
           message:'user created successfully',
           success:true,
           data:createdUser
       });
    }catch(error){
        next(error)
    }

}
export async function verifyAccount(req,res,next){
    try{
      const data=  validateBody(verifyAccountDTO,req.body);
        const{email,code}=data;
       const updatedUser= await authService.verifyAccount(email,code)
        res.json({
            message:"User verified successfully",
            success:true,
            data:updatedUser,

        });

    }catch (error){
        next(error);
    }
}
export async function login(req,res,next){
    try{
       const data= validateBody(loginDTO,req.body);
        const{email,password}=data;
        const token=await authService.login(email,password);
        res.cookie('access_token',token,{
            httpOnly:true,
            maxAge:toMs(1,'hours'),
        })
        res.json({
            message:"login successfully",
            success:true,

        })

    }catch(error){
        next(error);
    }
}
export async function sendOtp(req,res,next){
    try{
        const data=validateBody(sendDTO,req.body)
    const {email}=data;
  await  authService.sentOtp(email);
  res.json({message:'new otp sent,check user email',success:true});
    }catch(err){
        next(err)
    }
}
export async function resetPassword(req,res,next){
    try{
        const data = validateBody(resetPasswordDTO,req.body);
        const {email,code,newPassword}=data;
       await authService.resetPassword(email,code,newPassword);
        res.json({message:'password reset successfully',success:true});
    }catch(error){
        next(error);
    }
}
export async function loginWithGoogle(req,res,next){
    try {
       const token= await authService.loginWithGoogle(req.body.idToken);
       res.cookie('access_token',token,{
           httpOnly:true,maxAge:toMs(1,'hours'),
       })
        res.json({message:"user logged successfully",success:true});
    }catch(error){
        next(error)
    }
}