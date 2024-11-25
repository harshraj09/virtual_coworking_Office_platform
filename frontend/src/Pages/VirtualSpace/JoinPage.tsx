import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import "./joinRoom.css"
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';
import { useSocket } from '../../context/SocketContext/SocketContext';
import APIService from '../../service/APIService.ts/APIService';
interface LocalUserType {
  avatar: string,
  email: string,
  name: string,
  position: { x: number, y: number }
  _id: string
}

interface MembersType {
  avatar : string,
  email : string,
  name : string,
  position : {
    x : number,
    y : number
  }
  _id : string
}

const VirtualSpace: React.FC = () => {
  const [myStream, setMyStream] = useState<MediaStream>();
  const [camera, setCamera] = useState<boolean>(false);
  const [mic, setMic] = useState<boolean>(false);
  const [localUser, setLocalUser] = useState<LocalUserType>(APIService.getItem("user") as any);
  const {spaceId} = useParams<{spaceId : string}>();
  const navigate = useNavigate();
  const { socket } = useSocket() || { socket: null };

  const handelBasciConfig = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setMyStream(stream);
  }, [myStream]);

  const handelAvatarNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLocalUser((prev) => ({
      ...prev,
      avatar: e.target.value,
      name: prev?.name || '',
      email: prev?.email || '',
      position: prev?.position || { x: 0, y: 0 },
      _id: prev?._id || '',
    }));
  }, []);

  const handelJoinUser = async () => {
    if (true) {
      socket?.emit("join-space", { spaceId, user: localUser });
      navigate(`/space/${spaceId}/room`);
    }
  }

  useEffect(() => {
    handelBasciConfig();
  }, []);

  return (
    <div className="join-room">
      <div className='join-room-setup'>
        <div className='cam-win'>
          {
            !camera ? (<div style={{
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%", height: "100%",
              borderRadius: "10px"
            }}><h1>Cam Off</h1></div>) : (<ReactPlayer width={"100%"} height={"100%"} url={myStream} style={{ borderRadius: "10px" }} playing={camera} muted={!mic} />)
          }
        </div>
        <div className='cam-setup'>
          <div className='cam-controller'>
            <button onClick={() => setCamera(!camera)} className='join-btn'>Camera</button>
            <button onClick={() => setMic(!mic)} className='join-btn'>Microphone</button>
          </div>
          <input type='text' name='avatar' value={localUser?.avatar} onChange={handelAvatarNameChange} placeholder='Enter Your Name' />
          <button className='join-btn' onClick={handelJoinUser}>JOIN</button>
        </div>
      </div>
    </div>
  )
}

export default VirtualSpace;