import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faToolbox,
  faMicrophone, faMicrophoneSlash,
  faVideo, faVideoSlash,
  faPhoneSlash
} from '@fortawesome/free-solid-svg-icons';
import './MeetingRoom.css';

interface IParticipants {
  _id: string | number;
  name: string;
  stream: MediaStream | null;
}

const MeetingRoom: React.FC = () => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [participants, setParticipants] = useState<IParticipants[]>([
    { _id: 1, name: 'You', stream: myStream },
    { _id: 2, name: 'John', stream: myStream },
  ]);

  const setMyMediaStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: isVideoOn,
        audio: isMicOn,
      });
      setMyStream(stream);
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  }, [isMicOn, isVideoOn]);

  useEffect(() => {
    setMyMediaStream();

    videoRefs.current = videoRefs.current.slice(0, participants.length);

    return () => {
      if (myStream) {
        myStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [setMyMediaStream]);

  useEffect(() => {
    participants.forEach((participant, index) => {
      const videoElement = videoRefs.current[index];
      if (videoElement && participant.stream) {
        videoElement.srcObject = participant.stream;
      }
    });
    console.log(participants);
  }, [participants]);


  useEffect(() => {
    setParticipants((prev) => {
      const updated = [...prev];
      updated[0] = { ...updated[0], stream: myStream }; // Update 'You' stream
      return updated;
    });
  }, [myStream]);

  const toggleMic = () => {
    setIsMicOn((prev) => {
      myStream?.getAudioTracks().forEach((track) => (track.enabled = !prev));
      return !prev;
    });
  };

  const toggleVideo = () => {
    setIsVideoOn((prev) => {
      myStream?.getVideoTracks().forEach((track) => (track.enabled = !prev));
      return !prev;
    });
  };

  const sendStreamToMembers = () => {
    console.log('Sending stream to all members');
    // In a real application, you would implement the logic to send the stream here
  };

  return (
    <div className="meeting-room">
      <div className="video-grid">
        {participants.map((participant, index) => (
          <div key={participant._id} className="video-container">
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              autoPlay
              muted={participant._id === 1}
              className="video-feed"
            />
            <div className="participant-name">{participant.name}</div>
          </div>
        ))}
      </div>
      <div className="control-bar">
        <button className="control-button" onClick={sendStreamToMembers}>
          <FontAwesomeIcon icon={faToolbox} />
        </button>
        <button className="control-button" onClick={toggleMic}>
          <FontAwesomeIcon icon={isMicOn ? faMicrophone : faMicrophoneSlash} />
        </button>
        <button className="control-button" onClick={toggleVideo}>
          <FontAwesomeIcon icon={isVideoOn ? faVideo : faVideoSlash} />
        </button>
        <button className="control-button end-call">
          <FontAwesomeIcon icon={faPhoneSlash} />
        </button>
      </div>
    </div>
  );
};

export default MeetingRoom;