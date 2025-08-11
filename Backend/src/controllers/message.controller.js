import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar=async(req,res)=>{
    try{
        const loggeInUserId=req.user._id;
        //not equal to user id as we have to show everyone except user
        //it says find all the user not equal to current user and show everything except password
        const filteredUsers=await User.find({_id:{$ne:loggeInUserId}}).select("-password");
        //mongodb expect operator to passed inside {}
        res.status(200).json(filteredUsers);
    }
    catch(error){
        console.error("Error in getUsersForSidebar:",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const getMessages=async(req,res)=>{
    try {
        //getting id param from params object and then renaming it
        const {id:userToChatId} = req.params
        const myId=req.user._id;

        const messages=await Message.find({
            //this is or operator always an array match either of the followiing condition
            //it will give array of all the message which i send to someone or someone sent me
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
            ]
        })
        
    res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller:",error.message);
        res.status(500).json({error:"Internal server error"})
        
    }
}



export const sendMessage=async(req,res)=>{
   
    try {
       const {text,image}=req.body;
       const {id:receiverId}=req.params;
       const senderId=req.user._id; 
       let imageUrl;
       if(image){
        //upload base64to cloudinary
        const uploadResponse=await cloudinary.uploader.upload(image);
        imageUrl=uploadResponse.secure_url;
       }


       const newMessage=new Message({
        senderId,
        receiverId,
        text,
        image:imageUrl,
       });
       await newMessage.save();

    //    realtime functionality goes here =>socket.io
        const receiverSocketId=getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

       res.status(201).json(newMessage);
    } 
    catch (error) {
        console.log("Error in sendMessage controller:",error.message);
        console.log("Error in sendMessage controller:",error.message);
    }
};