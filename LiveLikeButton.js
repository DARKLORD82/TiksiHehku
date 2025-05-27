
import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';
import { getFirestore, doc, updateDoc, increment } from 'firebase/firestore';

const db = getFirestore();

export default function LiveLikeButton({ liveId }) {
  const [tapCount, setTapCount] = useState(0);

  const handleTap = async () => {
    setTapCount(prev => prev + 2);
    const docRef = doc(db, "live", liveId);
    await updateDoc(docRef, {
      likes: increment(2)
    });
  };

  return (
    <Pressable onPress={handleTap} style={{ flex: 1 }}>
      <Text style={{ position: 'absolute', bottom: 20, right: 20, fontSize: 30 }}>🔥 {tapCount}</Text>
    </Pressable>
  );
}
