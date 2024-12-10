
import { useCallback, useEffect, useState } from 'react';
import Chat from '../../components/Chat/Chat';
import Game from '../../components/Game/Game';
import RoomHeader from '../../components/RoomHeader/RoomHeader';
import './room.css';
import Loading from '../../components/Loading/Loading';
import APIService from '../../service/APIService.ts/APIService';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../components/Toast/Toast';
import { VideoStrip } from '../../components/VideoComponents/VideoStrip';

const Room = () => {
  const [loading, setLoading] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const localUser = useCallback(async () => {
    const token = APIService.getItem("token");
    try {

      const response = await APIService.axiosInstance.get("/api/dashboard", {
        headers: {
          Authorization: `Bearear ${token}`
        }
      })
      if (response.data.success) {
        setLoading(false);
        return;
      }
      console.log({ response });
      setUser(APIService.getItem("user"));
      showToast("You Need To Login First", "error", 3000);
      navigate("/login");
    } catch (err) {
      navigate("/login");
      showToast("You Need To Login First", "error", 3000);
    }
  }, [user]);

  console.log({ user });

  const handleUserStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      });
      setStream(stream);
    } catch (err) {
      console.log("There is Error in playing");
    }
  }, [stream])

  useEffect(() => {
    handleUserStream();
    localUser();
  }, []);

  const mockParticipants = [
    {
      id: '1',
      username: 'John Doe',
      isMuted: true,
      stream : stream,
      isVideoOff: false,
    },
    {
      id: '2',
      username: 'Jane Smith',
      stream : stream,
      isMuted: true,
      isVideoOff: false,
    },
    // {
    //   id: '3',
    //   stream : stream,
    //   username: 'Mike Johnson',
    //   isMuted: true,
    //   isVideoOff: false,
    // },
    // {
    //   id: '4',
    //   stream : stream,
    //   username: 'Sarah Wilson',
    //   isMuted: true,
    //   isVideoOff: false,
    // },
  ];

  return (
    <div className="container">
      {
        loading ? <Loading /> : <>

          <RoomHeader />
          <div className="main-content">
            <VideoStrip participants={mockParticipants} />
            <div className="empty-space">
              <Game />
            </div>
            <div className="chat-sidebar">
              <Chat />
            </div>
          </div>
        </>
      }
    </div>
  );
}


export default Room