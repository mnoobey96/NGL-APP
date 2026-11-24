import { Router } from 'express';
import {withCache} from "../../lib/cache/withCache.js";
import {User} from "./model/user.model.js";
import {multerArrayFile, multerSingleFile} from "../../lib/media/multer.js";

const userRouter = Router();

userRouter.get('/get-all-users',withCache(),async (req, res, next) => {
    const users = await User.find();
    res.json(users);
});

userRouter.post('/upload-profile-pic',multerSingleFile('pp'),(req,res,next)=>{
    res.json('ok')
})

userRouter.post('/upload-cover-pics',multerArrayFile('cover-images',3),(req,res,next)=>{
    res.json('done')
})
export default userRouter;