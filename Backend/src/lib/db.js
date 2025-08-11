import mongoose from 'mongoose'

export const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGODB_URI);
        console.log("mogodb connected successfully");
        return conn;
    }
    catch(error){
        console.log("mongoose connection error",error)
    }
}