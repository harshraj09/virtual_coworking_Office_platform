import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

interface EmptyChatStateProps {
  onStartChat: () => void;
}

export default function EmptyChatState({ onStartChat }: EmptyChatStateProps) {
  return (
    <div className="center-content">
      <FontAwesomeIcon icon={faComments} className="icon-large" />
      <button className="button-primary" onClick={onStartChat}>
        Start Chat
      </button>
    </div>
  );
}

