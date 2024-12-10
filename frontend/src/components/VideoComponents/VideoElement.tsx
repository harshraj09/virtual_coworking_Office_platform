import React from 'react';
import { Mic, MicOff, Video, VideoOff } from 'lucide-react';
import styles from './styles/VideoElement.module.css';

interface VideoElementProps {
  stream?: MediaStream;
  isMuted?: boolean;
  isVideoOff?: boolean;
  username: string;
}

export const VideoElement: React.FC<VideoElementProps> = ({
  stream,
  isMuted = false,
  isVideoOff = false,
  username,
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className={styles.container}>
      {stream && !isVideoOff ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isMuted}
          className={styles.video}
        />
      ) : (
        <div className={styles.fallback}>
          <div className={styles.avatar}>
            <span className={styles.avatarText}>
              {username.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      )}
      
      <div className={styles.controls}>
        <span className={styles.username}>{username}</span>
        <div className={styles.icons}>
          {isMuted ? (
            <MicOff className={`${styles.icon} ${styles.iconRed}`} />
          ) : (
            <Mic className={`${styles.icon} ${styles.iconWhite}`} />
          )}
          {isVideoOff ? (
            <VideoOff className={`${styles.icon} ${styles.iconRed}`} />
          ) : (
            <Video className={`${styles.icon} ${styles.iconWhite}`} />
          )}
        </div>
      </div>
    </div>
  );
};