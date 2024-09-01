const  Socket  = require("socket.io");
export const roomHandeler = (socket) => {
  const createRoom = () => {
    console.log("user created the room");
  };
  const joinRoom =()=>{
    console.log("user join the room");
  }



  socket.on("create-room", createRoom);
  socket.on("join-room", joinRoom);
};

