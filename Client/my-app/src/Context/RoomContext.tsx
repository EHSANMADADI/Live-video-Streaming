import { createContext, ReactNode, useEffect } from "react";
import socketIO from 'socket.io-client';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid"

export const RoomContext = createContext<any | null>(null);
const WS = "http://localhost:3000";
const ws = socketIO(WS);


export const RoomProvider: React.FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    const [me, setMe] = useState<Peer>()
    const navigate = useNavigate()
    const [stream, setStream] = useState<MediaStream>();
    const enterRoom = ({ roomId }: { roomId: "string" }) => {
        console.log({ roomId });
        navigate(`/room/${roomId}`)

    }

    const getUsers = ({ participants }: { participants: string[] }) => {
        console.log({ participants });
    }

    useEffect(() => {
        const meId = uuidV4()
        const peer = new Peer(meId)
        setMe(peer)
        ws.on("room-created", enterRoom);
        ws.on("get-users", getUsers)
        try {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    setStream(stream)
                })
        }
        catch (error) {
            console.error(error)
        }

    },[])

    useEffect(()=>{
        if(!me) return ;
        if(!stream) return ;

        ws.on("user-joined",({peerId})=>{
            const call=me.call(peerId,stream);
        })

        me.on('call',(call)=>{
            call.answer(stream);

        })
    },[me,stream])

    return (
        <RoomContext.Provider value={{ ws, stream, me }}>
            {children}
        </RoomContext.Provider>
    );
};