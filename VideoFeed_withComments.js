
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { getDownloadURL, ref } from 'firebase/storage';
import { collection, getDocs, doc, updateDoc, increment, arrayUnion } from 'firebase/firestore';
import { storage } from './firebase';
import { db } from './firebase';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

export default function VideoFeed() {
  const [videos, setVideos] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const fetchVideos = async () => {
      const videoCollection = await getDocs(collection(db, 'videos'));
      const videoList = await Promise.all(videoCollection.docs.map(async (docSnap) => {
        const data = docSnap.data();
        const url = await getDownloadURL(ref(storage, data.filePath));
        return {
          id: docSnap.id,
          url,
          likes: data.likes || 0,
          userId: data.userId,
          originalName: data.originalName,
          comments: data.comments || []
        };
      }));
      setVideos(videoList);
    };
    fetchVideos();
  }, []);

  const handleLike = async (videoId) => {
    const videoRef = doc(db, 'videos', videoId);
    await updateDoc(videoRef, {
      likes: increment(1)
    });
    setVideos(prev => prev.map(v => v.id === videoId ? { ...v, likes: v.likes + 1 } : v));
  };

  const handleAddComment = async (videoId) => {
    const comment = commentInputs[videoId];
    if (!comment) return;
    const videoRef = doc(db, 'videos', videoId);
    await updateDoc(videoRef, {
      comments: arrayUnion(comment)
    });
    setVideos(prev => prev.map(v => v.id === videoId ? { ...v, comments: [...v.comments, comment] } : v));
    setCommentInputs({ ...commentInputs, [videoId]: '' });
  };

  return (
    <FlatList
      data={videos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.videoContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('profile', { userId: item.userId })}>
            <Text style={styles.profileLink}>👤 Katso profiili</Text>
          </TouchableOpacity>
          <Video
            source={{ uri: item.url }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            isLooping
            useNativeControls
            style={styles.video}
          />
          <Text style={styles.name}>{item.originalName}</Text>
          <Button title={`❤️ Tykkää (${item.likes})`} onPress={() => handleLike(item.id)} />

          <TextInput
            style={styles.commentInput}
            placeholder="Kommentoi..."
            value={commentInputs[item.id] || ''}
            onChangeText={text => setCommentInputs({ ...commentInputs, [item.id]: text })}
          />
          <Button title="💬 Lähetä kommentti" onPress={() => handleAddComment(item.id)} />
          <View style={styles.commentList}>
            {item.comments.map((cmt, idx) => (
              <Text key={idx} style={styles.comment}>💬 {cmt}</Text>
            ))}
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  videoContainer: { marginBottom: 30, padding: 10, backgroundColor: '#f0f0f0' },
  video: { width: '100%', height: 200 },
  name: { marginVertical: 5, fontSize: 16, fontWeight: 'bold' },
  profileLink: { fontSize: 14, color: '#007AFF', marginBottom: 5 },
  commentInput: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginVertical: 10 },
  commentList: { marginTop: 5 },
  comment: { fontSize: 14, color: '#333' }
});
