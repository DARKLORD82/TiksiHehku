
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

export default function LiveCommentsOverlay({ roomId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'liveRooms', roomId, 'messages'), (snapshot) => {
      setComments(snapshot.docs.map(doc => doc.data()));
    });
    return unsubscribe;
  }, [roomId]);

  return (
    <ScrollView style={styles.container}>
      {comments.map((comment, index) => (
        <Text key={index} style={styles.comment}>💬 {comment.text}</Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: 10,
    right: 10,
    maxHeight: 150,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    borderRadius: 8
  },
  comment: {
    color: '#fff',
    marginBottom: 5
  }
});
