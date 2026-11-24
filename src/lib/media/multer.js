import multer, {diskStorage} from 'multer';
import crypto from 'node:crypto';
import {AppError} from "../error/error.js";
function uploadFiles(allowedTypes=['image/png','image/jpeg']){
   return multer({
        storage:diskStorage({
            fileFilter:function(req,file,cb){
                if(!allowedTypes.includes(file.mimetype)){
                   return cb(new AppError('invalid file format',400,false))
                }
                cb(null,true);
            },
            destination:'uploads',
            filename:function(req,file,cb){
                console.log(file);
                cb(null, `${crypto.randomUUID()}-${file.originalname}`);
            }
        })

    })
}
export function multerSingleFile(fieldName,allowedTypes=['image/png','image/jpeg']){
    return uploadFiles(allowedTypes).single(fieldName);
}
export function multerArrayFile(fieldName,maxCount){
    return uploadFiles().array(fieldName,maxCount)
}
export function multerFields(fields){
   return  uploadFiles().fields(fields)
}
