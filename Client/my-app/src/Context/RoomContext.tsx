import { createContext, ReactNode, useEffect } from "react";
import socketIO from 'socket.io-client';
import { useState } from "react";

const WS = "http://localhost:3000";
export const RoomContext = createContext<any | null>(null);
const ws = socketIO(WS);




export const RoomProvider: React.FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    const [stream,setStream]=useState<MediaStream>();
    useEffect(()=>{
        try{
            navigator.mediaDevices.getUserMedia({video:true,audio:true})
            .then((stream)=>{
                setStream(stream)
            })
        }
        catch(error){
            console.error(error)
        }
        ws.on("create-room",()=>{
            console.log('create-room-in useEffect');
            
        })
    })
    return (
        <RoomContext.Provider value={{ws,stream}}>
            {children}
        </RoomContext.Provider>
    );
};