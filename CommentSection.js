import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, db } from './firebase';

export default function CommentsSection({ videoId }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'videos', videoId, 'comments'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, [videoId]);

  const handlePost = async () => {
    if (!comment.trim()) return;
    await addDoc(collection(db, 'videos', videoId, 'comments'), {
      text: comment,
      user: auth.currentUser.email,
      timestamp: Date.now(),
    });
    setComment('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.comment}><Text style={styles.user}>{item.user}:</Text> {item.text}</Text>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Kommentoi..."
        value={comment}
        onChangeText={setComment}
      />
      <Button title="Lähetä" onPress={handlePost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  comment: { paddingVertical: 4 },
  user: { fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 10,
    borderRadius: 5,
  },
});