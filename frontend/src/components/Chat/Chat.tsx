import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faExpand, faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import './Chat.css';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
// import EmptyChatState from '../EmptyChatState/EmptyChatState';
// import ChatPreview from '../ChatPreview/ChatPreview';
import MessageInput from '../MessageInput/MessageInput';
import { useParams } from 'react-router-dom';
import APIService from '../../service/APIService.ts/APIService';
import { useSocket } from '../../context/SocketContext/SocketContext';

interface Message {
  id: string;
  sender: string;
  message : string;
}

type ChatState = 'Group Chat';

export default function Chat() {
  const [chatState, setChatState] = useState<ChatState>('Group Chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const {spaceId} = useParams();
  const user = APIService.getItem("user");
  const userId = user._id;
  const {socket} = useSocket() || {socket : null};
  const [chatId, setChatId] = useState<string | null>(null);



  // const handleSendMessage = useCallback((text: string) => {
  //   const newMessage = {
  //     userId : userId,
  //     messages : text,
  //     spaceId : spaceId,
  //     chatId : chatId
  //   };

  // },[socket]);


  const dropdownItems = [
    {
      label: 'Settings',
      onClick: () => console.log('Settings clicked')
    },
    {
      label: 'Help',
      onClick: () => console.log('Help clicked')
    },
    {
      label: 'Logout',
      onClick: () => console.log('Logout clicked')
    }
  ];

  useEffect(()=>{
    socket?.on("new_message", ({sender ,time , message})=>{
      // console.log({data});
      setMessages((prev)=> [...prev, 
        {
          id : time,
          message : message,
          sender : sender
        }
      ]);
    })
    return(()=>{
      socket?.off("new_message");
    })
  }, [socket]);
  
  return (
    <div className="chat-container chat-sidebar">
      <div className="chat-header">
        <h2>{chatState}</h2>
        <div className="header-actions">
          {/* {chatState === 'Chat' && (
            <button className="icon-button" onClick={handleNewChat}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
          )} */}
          {/* <button className="icon-button">
            <FontAwesomeIcon icon={faSync} />
          </button>
          <button className="icon-button" onClick={()=>{}}>
            <FontAwesomeIcon icon={faExpand} />
          </button> */}
          {/* <DropdownMenu  items={dropdownItems} /> */}
        </div>
      </div>
      {chatState === 'Group Chat' && (
        <>
          <div className="messages">
            {messages.map((message) => (
              <div key={message.id} className="message">
                <div className="message-avatar">
                  {message.sender[0].toUpperCase()}
                </div>
                <div className="message-content">
                  <div className="message-text">{message.message}</div>
                  <div className="message-time">{message.sender}</div>
                </div>
              </div>
            ))}
          </div>
          <MessageInput chatId={chatId} />
        </>
      )}
    </div>
  );
}

