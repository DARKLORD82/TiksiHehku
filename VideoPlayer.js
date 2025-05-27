
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Video } from 'expo-av';
import { getFirestore, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { getApp } from 'firebase/app';

const db = getFirestore(getApp());

export default function VideoPlayer() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "videos"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => doc.data());
      setVideos(list);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎬 TiksiHehku Feed</Text>
      <FlatList
        data={videos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Video
            source={{ uri: item.url }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="contain"
            shouldPlay
            useNativeControls
            style={styles.video}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  video: { width: '100%', height: 250, marginBottom: 20 }
});
