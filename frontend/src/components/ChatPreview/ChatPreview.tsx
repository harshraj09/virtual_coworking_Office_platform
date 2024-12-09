import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './ChatPreview.css';

interface ChatPreviewProps {
  name: string;
  avatar?: string;
  onClick: () => void;
}

export default function ChatPreview({ name, avatar, onClick }: ChatPreviewProps) {
  return (
    <div className="chat-preview" onClick={onClick}>
      <div className="chat-preview-avatar">
        {avatar ? (
          <img src={avatar} alt={name} className="avatar" />
        ) : (
          <FontAwesomeIcon icon={faUser} className="avatar-icon" />
        )}
      </div>
      <div className="chat-preview-content">
        <div className="chat-preview-header">
          <h3 className="chat-preview-name">{name}</h3>
        </div>
      </div>
    </div>
  );
}

