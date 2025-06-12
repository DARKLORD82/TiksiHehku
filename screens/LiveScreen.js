// LiveScreen.js (toimii sekä mobiilissa että Webissä)
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, Button, ActivityIndicator } from 'react-native';

// Mobiilialusta: käytetään native LiveKitRoom
// Web-alusta: käytetään fallback-viestiä tai erillinen toiminto

let LiveKitRoom;
let Room, ParticipantView;

if (Platform.OS !== 'web') {
  LiveKitRoom = require('@livekit/react-native').LiveKitRoom;
} else {
  Room = require('@livekit/components-react').Room;
  ParticipantView = require('@livekit/components-react').ParticipantView;
}

const HOST_URL = 'wss://tiksihehku-ivm01d0v.livekit.cloud';
const TOKEN = 'PASTE_YOUR_STATIC_TOKEN_HERE';

export default function LiveScreen() {
  const [connected, setConnected] = useState(false);
  const [roomInstance, setRoomInstance] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      const { Room, RoomEvent, createLocalTracks, connect } = require('livekit-client');
      const joinRoom = async () => {
        const newRoom = new Room();
        setRoomInstance(newRoom);

        newRoom.on(RoomEvent.Connected, () => {
          setConnected(true);
          console.log('✅ Yhdistetty LiveKit-huoneeseen.');
        });

        newRoom.on(RoomEvent.Disconnected, () => {
          setConnected(false);
        });

        try {
          const tracks = await createLocalTracks({ audio: true, video: true });
          await connect(newRoom, HOST_URL, TOKEN, { tracks });
        } catch (err) {
          console.error('Virhe yhdistettäessä LiveKit-huoneeseen:', err);
        }
      };

      joinRoom();

      return () => {
        newRoom?.disconnect();
      };
    }
  }, []);

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Live-lähetys (Web-versio)</Text>
        <Room
          token={TOKEN}
          serverUrl={HOST_URL}
          connectOptions={{ autoSubscribe: true }}
          onDisconnected={() => setConnected(false)}
        >
          <ParticipantView />
        </Room>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Live-lähetys (Mobiili)</Text>
      {connected ? (
        <Text style={styles.status}>🔴 Kamera päällä – olet lähetyksessä</Text>
      ) : (
        <ActivityIndicator size="large" color="#D32F2F" />
      )}
      {roomInstance && <LiveKitRoom room={roomInstance} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 10,
  },
  status: {
    textAlign: 'center',
    marginBottom: 20,
  },
});
