import React, { useContext, useEffect, useRef, useState } from "react";
import "./App.css";
import "./index.css";
import { RoomContext } from "./Context/RoomContext";
import VideoPlayer from "./Componnent/VideoPlayer";
import CreateBtn from "./Componnent/CreateBtn";

function App() {
  // const [stream, setStream] = useState<MediaStream | null>(null);
   const {stream}=useContext(RoomContext)



  return (
    <div className="flex w-screen items-center h-screen justify-center">
      <CreateBtn/>
      <VideoPlayer stream={stream}/>
    </div>
  );
}

export default App;
