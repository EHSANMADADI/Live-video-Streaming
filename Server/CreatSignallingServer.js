
///createsignalling.js
// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors');
// const { roomHandler } = require("./room/index.ts");
import express from 'express';
import http from 'http';
import { Server as SocketIoServer } from 'socket.io';
import cors from 'cors';
import { roomHandler } from './room/index.js';

const app = express();
app.use(cors);
const server = http.createServer(app);
const io = new SocketIoServer(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});

const rooms = {};



io.on('connection', (socket) => {
    /////////////////////
    // const createRoom = () => {
    //     const roomId = uuidV4();
    //     rooms[roomId] = []
    //     socket.emit("room-created", { roomId });
    //     console.log("user created the room");
    // };
    // const joinRoom = ({ roomId, peerId }) => {
    //     if (rooms[roomId]) {
    //         console.log("user join the room", roomId, peerId);
    //         rooms[roomId].push(peerId);
    //         socket.join(roomId);
    //         socket.to(roomId).emit("user-joined",{peerId})
    //         socket.emit('get-users', {
    //             roomId,
    //             participants: rooms[roomId],
    //         })
    //     }
    //     socket.on("disconnect", () =>{
    //         console.log("user left the room",peerId);
    //         leaveRoom({roomId,peerId})
    //     })


    // }

    // const leaveRoom=({roomId, peerId}) => {
    //   rooms[roomId]=rooms[roomId].filter(id=>id !== peerId);
    //   socket.to(roomId).emit("user-disconnected",peerId);
    // }
    //////////////////////////////////////

    roomHandler(socket);
    console.log('New client connected');

    socket.on('offer', (data) => {
        socket.broadcast.emit('offer', data);
    });




    // socket.on("join-room", joinRoom);
    // socket.on("create-room", createRoom);

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
