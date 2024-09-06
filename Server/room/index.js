import { v4 as uuidV4 } from 'uuid';
//const { Socket } = require('socket.io');
import { Socket } from "socket.io";
export const roomHandler = (socket) => {
  const rooms = {};
  const createRoom = () => {
    const roomId = uuidV4();
    rooms[roomId] = []
    socket.emit("room-created", { roomId });
    console.log("user created the room");
  };
  const joinRoom = ({ roomId, peerId }) => {
    if (rooms[roomId]) {
      console.log("user join the room", roomId, peerId);
      rooms[roomId].push(peerId);
      socket.join(roomId);
      socket.to(roomId).emit("user-joined", { peerId })
      socket.emit('get-users', {
        roomId,
        participants: rooms[roomId],
      })
    }
    socket.on("disconnect", () => {
      console.log("user left the room", peerId);
      leaveRoom({ roomId, peerId })
    })


  }

  const leaveRoom = ({ roomId, peerId }) => {
    rooms[roomId] = rooms[roomId].filter(id => id !== peerId);
    socket.to(roomId).emit("user-disconnected", peerId);
  }

  socket.on("join-room", joinRoom);
  socket.on("create-room", createRoom);
};

