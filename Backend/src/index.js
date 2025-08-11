import express from 'express'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { app, server } from "./lib/socket.js";
import { connectDB } from './lib/db.js';
import cors from "cors"

dotenv.config();
app.use(express.json({limit:'10mb'}));
app.use(cookieParser({limit:'10mb',extended:true}));


const port =process.env.PORT
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes);

connectDB().then(()=>{
    server.listen(port,()=>{
    console.log("hello from the server everybody")
})
})
