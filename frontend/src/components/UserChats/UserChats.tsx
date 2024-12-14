import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import "./UserChat.css"

// Define user type with notification status
interface User {
  id: number;
  name: string;
  email: string;

  hasNewNotification: boolean;
}

// Sample user data with notification status
const initialUsers: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", hasNewNotification: true },
  { id: 2, name: "Jane Smith", email: "jane@example.com", hasNewNotification: false },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", hasNewNotification: true },
  { id: 4, name: "Emily Brown", email: "emily@example.com", hasNewNotification: false },
  { id: 5, name: "David Wilson", email: "david@example.com", hasNewNotification: true }
];

const ChatPreview: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filtered and memoized users based on search term
  const filteredUsers = useMemo(() => {
    return initialUsers.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="members_list-container">
      <div className="members_list-search-wrapper">
        <input 
          type="text" 
          placeholder="Search users..." 
          className="members_list-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="members_list-search-button">
          <Search size={20} />
        </button>
      </div>

      <div className="members_list-user-list">
        {filteredUsers.map(user => (
          <div key={user.id} className="members_list-user-item">
            <div className="members_list-avatar-wrapper">
              <p className='members_list-user-avatar'>{user.name[0].toUpperCase()}</p>
              {user.hasNewNotification && (
                <span className="members_list-notification-dot"></span>
              )}
            </div>
            <div className="members_list-user-info">
              <h3 className="members_list-user-name">{user.name}</h3>
              <p className="members_list-user-email">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



export default ChatPreview;