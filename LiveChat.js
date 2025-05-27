import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, Button, Text, StyleSheet } from 'react-native';
import { db, auth } from './firebase';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

export default function LiveChat({ roomId }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'liveRooms', roomId, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, [roomId]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    await addDoc(collection(db, 'liveRooms', roomId, 'messages'), {
      text: message,
      user: auth.currentUser.email,
      timestamp: Date.now(),
    });
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.message}><Text style={styles.user}>{item.user}:</Text> {item.text}</Text>}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Kommentoi liveen..."
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Lähetä" onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, height: 250 },
  message: { paddingVertical: 4 },
  user: { fontWeight: 'bold' },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 8, marginRight: 8, borderRadius: 5 },
});