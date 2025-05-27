import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { db, auth } from './firebase';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';

export default function LiveLike({ roomId }) {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const likeRef = doc(db, 'liveRooms', roomId);
    const unsubscribe = onSnapshot(likeRef, (docSnap) => {
      if (docSnap.exists()) {
        setLikes(docSnap.data().likes || 0);
      }
    });
    return unsubscribe;
  }, [roomId]);

  const sendLike = async () => {
    const docRef = doc(db, 'liveRooms', roomId);
    const snap = await getDoc(docRef);
    let data = snap.data() || { likes: 0 };
    const newLikes = data.likes + 2; // 🔁 Yksi painallus = 2 tykkäystä
    await setDoc(docRef, { likes: newLikes }, { merge: true });
  };

  return (
    <View style={styles.container}>
      <Button title="💗 Tykkää (x2)" onPress={sendLike} />
      <Text style={styles.counter}>❤️ {likes} tykkäystä</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginVertical: 10 },
  counter: { marginTop: 5, fontSize: 16 },
});