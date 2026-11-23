import {Message} from "node-mailjet";

export async function createMessage(content,receiver,sender){
    return Message.create({
        content: content,
        sender: sender,
        receiver: receiver,
    })
};

export async function getAllMessages(userId){
        return Message.find({
        receiver:userId
    },{},{populate:{path:"sender",select:"name"}});
}