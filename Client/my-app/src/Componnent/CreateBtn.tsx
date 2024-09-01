import React, { useContext } from 'react'
import { RoomContext } from '../Context/RoomContext'

export default function CreateBtn() {
    const {ws}=useContext(RoomContext);
    const createRoom=()=>{
        ws.emit("create-room")
    }
  return (
    <button onClick={createRoom} className='bg-blue-600 p-2 rounded text-white '>Start new meeting</button>
  )
}
