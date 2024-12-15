import React from 'react';
import { VideoElement } from './VideoElement';
import styles from './styles/VideoStrip.module.css';

interface Participant {
  id: string;
  username: string;
  stream?: MediaStream;
  isMuted: boolean;
  isVideoOff: boolean;
}

interface VideoStripProps {
  participants: Participant[];
}

export const VideoStrip: React.FC<VideoStripProps> = ({ participants }) => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {participants.map((participant) => (
          <VideoElement
            key={participant.id}
            stream={participant.stream}
            isMuted={participant.isMuted}
            isVideoOff={participant.isVideoOff}
            username={participant.username}
          />
        ))}
      </div>
    </div>
  );
};