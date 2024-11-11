import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './DB/dbConnect.js';
import authRouter from './rout/authUser.js';
import messageRouter from './rout/messageRout.js';
import userRouter from './rout/userRout.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors'; // Import cors

import { app, server } from './Socket/socket.js';

dotenv.config();

// CORS setup for the Express app
app.use(cors({
    origin: 'http://localhost:5173', // Allow frontend to connect
    methods: ['GET', 'POST'], // Allow these HTTP methods
    credentials: true, // Allow credentials (cookies) to be sent
}));

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);
app.use('/api/user', userRouter);

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    dbConnect();
    console.log(`Working at ${PORT}`);
});
