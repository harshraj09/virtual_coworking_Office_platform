import { useCallback, useEffect, useState } from 'react';
import Chat from '../../components/Chat/Chat';
import Game from '../../components/Game/Game';
import RoomHeader from '../../components/RoomHeader/RoomHeader';
import './room.css';
import Loading from '../../components/Loading/Loading';
import APIService from '../../service/APIService.ts/APIService';
import { useNavigate, useParams } from 'react-router-dom';
import { showToast } from '../../components/Toast/Toast';
import { VideoStrip } from '../../components/VideoComponents/VideoStrip';
import { useSocket } from '../../context/SocketContext/SocketContext';
import Peer from '../../service/Peer';
import JoinUser from '../../components/JoinUser/JoinUser';
import ChatPreview from '../../components/UserChats/UserChats';

interface TypesParticipant {
  id: string;
  username: string;
  stream?: MediaStream;
  isMuted: boolean;
  isVideoOff: boolean;
}

type ComponentState = "Join_User" | "Chat_State" | "Active_Chat"

const Room = () => {
  const [componentState, setComponentState] = useState<ComponentState>("Join_User");
  const [camera, setCamera] = useState(true);
  const [mic, setMic] = useState(true);
  const [loading, setLoading] = useState(true);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(APIService.getItem('user'));
  const [participants, setParticipants] = useState<TypesParticipant[]>([]);
  const { socket } = useSocket() || { socket: null };
  const { spaceId } = useParams();

  const handelState = (state:ComponentState) => {
    setComponentState(state);
  }

  const startMyStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setMyStream(stream);
      setParticipants((prev) => [
        ...prev,
        {
          id: user._id,
          username: user.name,
          stream,
          isMuted: mic,
          isVideoOff: camera,
        },
        {
          id: user._id,
          username: "Harsh",
          stream,
          isMuted: mic,
          isVideoOff: camera,
        },
      ]);

      if (stream) {
        stream.getTracks().forEach((track) => {
          Peer.peer.addTrack(track, stream);
        });
      }
    } catch (err) {
      showToast((err as Error).message, 'error', 3000);
    }
  }, [camera, mic, user]);

  const localUser = useCallback(async () => {
    const token = APIService.getItem('token');
    try {
      const response = await APIService.axiosInstance.get('/api/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setLoading(false);
        return;
      }
      showToast('You need to login first', 'error', 3000);
      navigate('/login');
    } catch (err) {
      navigate('/login');
      showToast('You need to login first', 'error', 3000);
    }
  }, [navigate]);

  const handleOffer = useCallback(
    async ({ remoteId, offer }: any) => {
      try {
        if (remoteId === user._id) return;
        const answer = await Peer.getAnswer(offer);
        socket?.emit('send_answer', { remoteId, spaceId, answer });
      } catch (err) {
        console.error('Error handling offer:', err);
      }
    },
    [socket, spaceId, user._id]
  );

  const handleAnswer = useCallback(
    async ({ answer }: any) => {
      try {
        await Peer.setLocalDescription(answer);
      } catch (err) {
        console.error('Error handling answer:', err);
      }
    },
    []
  );

  const handleStreamTrack = useCallback(
    (event: RTCTrackEvent) => {
      const [stream] = event.streams;
      setParticipants((prev) =>
        prev.some((p) => p.stream?.id === stream.id)
          ? prev
          : [
              ...prev,
              {
                id: `remote-${Math.random()}`,
                username: 'Remote User',
                isMuted: true,
                isVideoOff: false,
                stream,
              },
            ]
      );
    },
    []
  );

  useEffect(() => {
    startMyStream();
  }, [startMyStream]);

  useEffect(() => {
    Peer.peer.addEventListener('track', handleStreamTrack);

    return () => {
      Peer.peer.removeEventListener('track', handleStreamTrack);
    };
  }, [handleStreamTrack]);

  useEffect(() => {
    localUser();
  }, [localUser]);

  useEffect(() => {
    socket?.on('user_calling', handleOffer);
    socket?.on('send_final_answer', handleAnswer);

    socket?.on('user:moved', async ({ userId, offer }: any) => {
      if (userId !== user._id) {
        const answer = await Peer.getAnswer(offer);
        socket.emit('send_final_answer', { answer, spaceId });
      }
    });

    return () => {
      socket?.off('user_calling', handleOffer);
      socket?.off('send_final_answer', handleAnswer);
      socket?.off('user:moved');
    };
  }, [socket, handleOffer, handleAnswer, spaceId, user._id]);

  return (
    <div className="room_container">
      {loading ? (
        <Loading />
      ) : (
        <>
          {myStream && <VideoStrip participants={participants} />}
          <RoomHeader handlState={handelState} />
          <div className="main-content">
            <div className="empty-space">
              <Game />
            </div>
            <div className="chat-sidebar">
              {componentState === "Chat_State" && <ChatPreview />}
              {componentState === "Join_User" && <JoinUser />}
              {componentState === "Active_Chat" && <Chat />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Room;
