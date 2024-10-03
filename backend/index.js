import express from "express";
import dotenv from 'dotenv'
import dbConnect from "./DB/dbConnect.js";
import authRouter from  './rout/authUser.js'
import messageRouter from './rout/messageRout.js'
// import messageRouter from './rout/messageRout.js'
 import userRouter from './rout/userRout.js'
// import cookieParser from "cookie-parser";
import path from "path";
// import {app , server} from './Socket/socket.js'
import { fileURLToPath } from 'url'; // Import for converting URL to path
import { dirname } from 'path'; // Import to get the directory name
import { createServer } from "http";
import cookieParser from "cookie-parser";

dotenv.config();
// Define __dirname in ES modules
const __filename = fileURLToPath(import.meta.url); // Get the file name
const __dirname = dirname(__filename); // Get the directory name
const app = express();

app.use(express.json());
app.use(cookieParser())

app.use('/api/auth',authRouter)
app.use('/api/message',messageRouter)
app.use('/api/user',userRouter)

app.use(express.static(path.join(__dirname,"frontend","dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})
// Connect to MongoDB
const startServer = async () => {
    try {
        await dbConnect();
        const server = createServer(app);
        const PORT = process.env.PORT || 3000;

        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
};

// Start the server
startServer();
// const server = createServer(app);
// const PORT = process.env.PORT || 3000

// server.listen(PORT,()=>{
//     dbConnect();
//     console.log(`Working at ${PORT}`);
// })
