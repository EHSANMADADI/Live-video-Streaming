import React, { useContext, useEffect } from 'react'
import VideoPlayer from '../Componnent/VideoPlayer'
import { RoomContext } from '../Context/RoomContext'
import { useParams } from 'react-router-dom'
export default function Room() {
     const {stream}=useContext(RoomContext);
     const {id}=useParams()
     const {ws,me}=useContext(RoomContext)
     useEffect(()=>{
         if(me) ws.emit("join-room",{roomId:id,peerId:me._id})
     },[id])
  return (
     <div className="flex w-screen items-center h-screen justify-center">
      <VideoPlayer stream={stream}/>
      {/* roompage{id} */}
      </div>
  )
}
