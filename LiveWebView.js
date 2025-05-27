// LiveWebView.js
import React, { useEffect, useRef } from 'react';
import { Room, Participant, RemoteTrackPublication, RemoteParticipant, createLocalTracks, connect } from 'livekit-client';

export default function LiveWebView() {
  const roomRef = useRef(null);

  useEffect(() => {
    const startLiveKit = async () => {
      const room = new Room();
      roomRef.current = room;

      room.on('participantConnected', (participant) => {
        console.log('Participant connected', participant.identity);
      });

      const token = 'YOUR_WEB_TOKEN_HERE';
      const url = 'wss://tiksihehku-ivm01d0v.livekit.cloud';

      await room.connect(url, token);
      await room.localParticipant.enableCameraAndMicrophone();
    };

    startLiveKit();

    return () => {
      roomRef.current?.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Live Web Stream</h2>
      {/* Add video elements dynamically if needed */}
    </div>
  );
}