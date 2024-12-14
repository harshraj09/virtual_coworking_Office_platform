import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import "./JoinUser.css"
import { useSocket } from '../../context/SocketContext/SocketContext'
import APIService from '../../service/APIService.ts/APIService'
import { GlobalContext } from '../../context/SocketContext/global/globalstate/GlobalState'

interface UserType {
    _id: string,
    name: string
}


const JoinUser:React.FC = () => {
    const { socket } = useSocket() || { socket: null };
    const [members, setMembers] = useState<UserType[]>([])
    const userId = useMemo(() => {
        const user = APIService.getItem("user");
        return user._id
    }, []);
    const {setJoinMembers} = useContext(GlobalContext);

    const handleUserJoin = useCallback(({ users }: any) => {
        setMembers(users);
        console.log({len : users.length})
        setJoinMembers(users.length - 1);
    }, [members]);

    useEffect(() => {
        socket?.on("join:success", handleUserJoin);
    }, [socket]);

    return (
        <div className="chat-container chat-sidebar">
            <div className="chat-header">
                <h2>{"Join Members"}</h2>
                <div className="header-actions">
                </div>
            </div>
            <>
                <div className="join_user_card">
                    {members.map((ele) =>  ele._id !== userId && (
                        <div key={ele._id} className="join_user_profile_card">
                            <div className="join_user_profile">
                                <p>{ele.name[0].toUpperCase()}</p>
                            </div>
                            <p>{ele.name}</p>
                        </div>
                    ))}
                </div>
            </>
        </div>
    )
}

export default JoinUser