
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { RoomProvider, useRoom, ParticipantView } from 'livekit-react-native';
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from './firebase';
import { auth } from './firebase';

const LiveHostContent = ({ roomId, token, url }) => {
  const { room, connect } = useRoom();
  const [message, setMessage] = useState('');

  React.useEffect(() => {
    connect(url, token);
  }, []);

  const sendComment = async () => {
    if (!message.trim()) return;

    try {
      await addDoc(collection(db, 'liveRooms', roomId, 'messages'), {
        text: message.trim(),
        time: serverTimestamp(),
        userId: auth.currentUser?.uid || 'anon'
      });
      setMessage('');
    } catch (err) {
      Alert.alert('Virhe', 'Kommentin lähetys epäonnistui');
    }
  };

  const sendLike = async () => {
    const likeRef = doc(db, 'live_likes', roomId);
    try {
      await updateDoc(likeRef, { count: increment(1) });
    } catch (err) {
      // Jos dokumenttia ei vielä ole, luodaan se
      await updateDoc(likeRef, { count: 1 }).catch(() =>
        setDoc(likeRef, { count: 1 })
      );
    }
  };

  return (
    <View style={styles.container}>
      <ParticipantView participant={room?.localParticipant} style={styles.video} />

      <TextInput
        style={styles.input}
        placeholder="Kirjoita kommentti..."
        value={message}
        onChangeText={setMessage}
      />
      <Button title="💬 Lähetä kommentti" onPress={sendComment} />
      <Button title="❤️ Lähetä tykkäys" onPress={sendLike} />
    </View>
  );
};

export default function LiveHostScreen() {
  const roomId = 'room123';
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ2aWRlbyI6eyJyb29tSm9pbiI6dHJ1ZSwicm9vbSI6ImxpdmUtdGlrc2kiLCJjYW5QdWJsaXNoIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWV9LCJpc3MiOiJBUEl5QlVVWGVudEhvbTgiLCJleHAiOjE3NDgzNjczNzcsIm5iZiI6MCwic3ViIjoiamFuaV9hYWx0byJ9.iF1NcKbJse8gsUYpFv2mwWMaxt_NcqRJgvzX2vXB-5M';';
  const url = 'wss://tiksihehku-ivm01d0v.livekit.cloud';

  return (
    <RoomProvider>
      <LiveHostContent roomId={roomId} token={token} url={url} />
    </RoomProvider>
  );
}



const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#000' },
  input: {
    backgroundColor: '#fff',
    padding: 8,
    marginVertical: 10,
    borderRadius: 4
  },
  video: {
    flex: 1,
    marginBottom: 10
  }
});
