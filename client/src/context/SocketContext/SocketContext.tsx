import React, { useMemo } from "react";
import {io, Socket} from 'socket.io-client'
const SocketContext = React.createContext<{ socket: Socket} | null>(null);

interface InSocket{
    children : React.ReactNode,
}

export const useSocket = () => {
    return React.useContext(SocketContext);
}

export const SocketProvider:React.FC<InSocket> = (props) => {
    const socket = useMemo(() => io("http://localhost:8000"), [])
    
    socket.emit("connection", "Hello world");
    
    return (
        <SocketContext.Provider value={{socket}}>
            {props.children}
        </SocketContext.Provider>
    );
}