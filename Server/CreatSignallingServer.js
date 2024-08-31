
///createsignalling.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const app = express();
app.use(cors);
const server = http.createServer(app);

const io = socketIo(server,{
    cors:{
        origin: '*',
        methods: ['GET', 'POST'],
    }
});


io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('offer', (data) => {
        socket.broadcast.emit('offer', data);
    });

    socket.on('answer', (data) => {
        socket.broadcast.emit('answer', data);
    });

    socket.on('candidate', (data) => {
        socket.broadcast.emit('candidate', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => console.log('Server is running on port 3000'));
