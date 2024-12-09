
import Chat from '../../components/Chat/Chat';
import Game from '../../components/Game/Game';
import RoomHeader from '../../components/RoomHeader/RoomHeader';
import './room.css';

const Room = () => {
  // const {meetingView} = useGlobalState();
  return (
    <div className="container">
      <RoomHeader/>
      <div className="main-content">
        <div className="empty-space">
          <Game/>
        </div>
        <div className="chat-sidebar">
          <Chat />
        </div>
      </div>
    </div>
  );
}


export default Room