
import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

export default function LiveLikeOverlay({ roomId }) {
  const [likes, setLikes] = useState(0);
  const [scale] = useState(new Animated.Value(1));

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'live_likes', roomId), (docSnap) => {
      const data = docSnap.data();
      if (data?.count !== likes) {
        setLikes(data.count || 0);
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.5,
            duration: 150,
            useNativeDriver: true
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true
          })
        ]).start();
      }
    });
    return unsubscribe;
  }, [roomId, likes]);

  return (
    <Animated.View style={[styles.overlay, { transform: [{ scale }] }]}>
      <Text style={styles.text}>❤️ {likes}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 30,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
    borderRadius: 20
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
