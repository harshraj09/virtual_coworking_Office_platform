import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSmile } from '@fortawesome/free-solid-svg-icons';
import './MessageInput.css';
import { useSocket } from '../../context/SocketContext/SocketContext';
import APIService from '../../service/APIService.ts/APIService';
import { useParams } from 'react-router-dom';

interface MessageInputProps {
  chatId : string | null
}


export default function MessageInput({ chatId }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const user = APIService.getItem("user");
  const userId:string = user._id;
  const {spaceId} = useParams();
  const { socket } = useSocket() || {socket : null};

  console.log({userId, spaceId, chatId})
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(message === ""){
      return;
    }
    socket?.emit("send_message", {userId, spaceId, message, chatId})
    setMessage("")
  };

  return (
    <form className="message-input-container" onSubmit={handleSubmit}>
      <button type="button" className="icon-button">
        <FontAwesomeIcon icon={faSmile} />
      </button>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="message-input"
      />
      <button type="submit" className="icon-button">
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </form>
  );
}

