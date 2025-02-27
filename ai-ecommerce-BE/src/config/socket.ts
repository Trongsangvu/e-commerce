// import { Server, Socket } from 'socket.io';
// import http from 'http';
// import express from 'express';

// const app = express();

// const server = http.createServer(app);
// const io = new Server(server);

// io.on('connecttion', () => {
//     cors: {
//         origin: '*'
//     }
// });

// io.on('connection', (socket) => {
//     console.log('user connected');

//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     })
// });

// export { server, io };