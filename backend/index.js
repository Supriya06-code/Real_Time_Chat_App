// import express from 'express';
// import dotenv from 'dotenv';
// import dbConnect from './DB/dbConnect.js';
// import authRouter from './rout/authUser.js';
// import messageRouter from './rout/messageRout.js';
// import userRouter from './rout/userRout.js';
// import cookieParser from 'cookie-parser';
// import path from 'path';
// import cors from 'cors'; // Import cors

// import { app, server } from './Socket/socket.js';

// dotenv.config();

// // CORS setup for the Express app
// app.use(cors({
//     origin: 'http://localhost:5173', // Allow frontend to connect
//     methods: ['GET', 'POST'], // Allow these HTTP methods
//     credentials: true, // Allow credentials (cookies) to be sent
// }));

// const __dirname = path.resolve();

// app.use(express.json());
// app.use(cookieParser());

// app.use('/api/auth', authRouter);
// app.use('/api/message', messageRouter);
// app.use('/api/user', userRouter);

// app.use(express.static(path.join(__dirname, '/frontend/dist')));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
// });

// const PORT = process.env.PORT || 3000;

// server.listen(PORT, () => {
//     dbConnect();
//     console.log(`Working at ${PORT}`);
// });
import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './DB/dbConnect.js';
import authRouter from './rout/authUser.js';
import messageRouter from './rout/messageRout.js';
import userRouter from './rout/userRout.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import { app, server } from './Socket/socket.js';

dotenv.config();

const __dirname = path.resolve();

app.use(cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', // Allows local and production frontends
    methods: ['GET', 'POST'],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);
app.use('/api/user', userRouter);

// Static file serving
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Fallback to `index.html` for Single Page Application (SPA) routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'), (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    dbConnect();
    console.log(`Server running on port ${PORT}`);
});
