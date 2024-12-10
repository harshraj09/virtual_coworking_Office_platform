import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faExpand, faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import './Chat.css';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
// import EmptyChatState from '../EmptyChatState/EmptyChatState';
import ChatPreview from '../ChatPreview/ChatPreview';
import MessageInput from '../MessageInput/MessageInput';
import { useParams } from 'react-router-dom';
import APIService from '../../service/APIService.ts/APIService';
import { useSocket } from '../../context/SocketContext/SocketContext';

interface Message {
  id: string;
  sender: string;
  time: string;
}

interface ChatPreviewData {
  _id: string;
  name: string;
  avatar?: string;
}

type ChatState = 'Join User' | 'Chat' | 'active';

export default function Chat() {
  const [chatState, setChatState] = useState<ChatState>('Join User');
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeChat, setActiveChat] = useState<ChatPreviewData | null>(null);
  const {spaceId} = useParams();
  const user = APIService.getItem("user");
  const userId = user._id;
  const {socket} = useSocket() || {socket : null};
  const [chatPreviews, setChatPreviews] = useState<ChatPreviewData[]>([]);
  const [joinUser , setJoinUser] = useState<ChatPreviewData[]>([]);
  const [chatId, setChatId] = useState<string | null>(null);

  const handleStartChat = useCallback(() => {
    socket?.emit("join_user", {spaceId, userId});
  }, [socket]);

  const handelChatState = () => {
    setChatState("Chat");
  }

  console.log({chatState})

  const handleOpenChat = (chat: ChatPreviewData) => {
    setActiveChat(chat);
    setChatState('active');
    // Create Chat First
    socket?.emit("load_message", {chatId, spaceId});
    socket?.emit("create_chat", {userId, anotherUserId : chat._id, spaceId});
    // In a real app, you would fetch messages for this chat here
    setMessages([
      {
        id: "12344",
        sender: "Hey How the Josh",
        time: '12 Sept 2024'
      }
    ]);
  };

  const handleNewChat = () => {
    socket?.emit("all_chats", {spaceId, userId});
  };

  // const handleSendMessage = useCallback((text: string) => {
  //   const newMessage = {
  //     userId : userId,
  //     messages : text,
  //     spaceId : spaceId,
  //     chatId : chatId
  //   };

  // },[socket]);

  const handleGoBack = () => {
    if (chatState === 'active') {
      setChatState('Chat');
      setActiveChat(null);
    } else {
      setChatState('Join User');
    }
    setMessages([]);
  };

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

  const handelAllJoinMembers = useCallback(({allJoinUsers}: any)=>{
    setJoinUser(allJoinUsers);
  }, [])

  const handelChat = useCallback(({newChat} : any)=>{
    setChatId(newChat._id);
  }, [chatId])


  const handleNewMessage = useCallback(({ allMessage }:any) => {
    console.log("New Message", allMessage);
    
  },[socket]);

  const handleAllUserChat = useCallback(({ allChats } : any)=>{
    setChatPreviews(allChats);
  }, [])

  useEffect(()=>{
    handleStartChat();
    handleNewChat();
  }, [socket])

  
  useEffect(()=>{
    socket?.on("all_message_array", (data)=>{
      console.log(data);
    });
    socket?.on("all_join_user", handelAllJoinMembers);
    socket?.on("all_user_chats", handleAllUserChat);
    socket?.on("user_chat", handelChat);
    socket?.on("show_all_message", handleNewMessage);
    return(()=>{
      socket?.off("all_user_chats", handleAllUserChat);
      socket?.off("show_all_message", handleNewMessage);
      socket?.off("user_chat", handelChat);
      socket?.off("all_join_user", handelAllJoinMembers);
    })
  }, [socket]);
  
  return (
    <div className="chat-container chat-sidebar">
      <div className="chat-header">
        {chatState !== 'Join User' && (
          <button className="icon-button" onClick={handleGoBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        )}
        <h2>{chatState === 'active' && activeChat ? activeChat.name : chatState}</h2>
        <div className="header-actions">
          {chatState === 'Chat' && (
            <button className="icon-button" onClick={handleNewChat}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
          )}
          <button className="icon-button">
            <FontAwesomeIcon icon={faSync} />
          </button>
          <button className="icon-button" onClick={handelChatState}>
            <FontAwesomeIcon icon={faExpand} />
          </button>
          <DropdownMenu items={dropdownItems} />
        </div>
      </div>
      {(chatState === 'Join User') && (<div className="chat-list">
          {joinUser.map((chat) => {
            if(chat._id !== userId){
              return (<ChatPreview
                key={chat._id}
                name={chat.name}
                avatar={chat.avatar}
                onClick={() => handleOpenChat(chat)}
              />)
            }
          })}
        </div>)}
      {chatState === 'Chat' && (
        <div className="chat-list">
          {chatPreviews.map((chat) => {
            if(chat._id !== userId){
              return (<ChatPreview
                key={chat._id}
                name={chat.name}
                avatar={chat.avatar}
                onClick={() => handleOpenChat(chat)}
              />)
            }
          })}
        </div>
      )}
      {chatState === 'active' && (
        <>
          <div className="messages">
            {messages.map((message) => (
              <div key={message.id} className="message">
                <div className="message-avatar">
                  {message.sender[0].toUpperCase()}
                </div>
                <div className="message-content">
                  <div className="message-text">{message.sender}</div>
                  <div className="message-time">{message.time}</div>
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

