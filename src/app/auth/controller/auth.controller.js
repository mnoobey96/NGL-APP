import * as authService from '../service/auth.service.js';
import {toMs} from "../../../common/utlis/time.js";
import {validateBody} from "../../../common/validation/validation.js";
import {loginDTO, registerDTO, resetPasswordDTO, sendDTO, verifyAccountDTO} from "../dto/auth.dto.js";

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