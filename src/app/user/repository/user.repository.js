import {User} from "../model/user.model.js";

export async function updateUserByEmail(email,updatedData){
    await User.findOneAndUpdate(
        {email:email}, //filter
        updatedData, // update
        {returnDocument:"after"} //options
    )
}

export async function findUserById(id){
    return User.findOne({_id:id,isDeleted:false})
}