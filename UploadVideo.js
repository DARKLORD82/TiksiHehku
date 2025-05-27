
import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { auth } from './firebase';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function UploadVideo() {
  const [video, setVideo] = useState(null);

  const pickVideo = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'video/*',
      copyToCacheDirectory: true
    });

    if (!result.canceled) {
      setVideo(result.assets[0]);
    }
  };

  const uploadVideo = async () => {
    if (!video) return;

    try {
      const response = await fetch(video.uri);
      const blob = await response.blob();
      const uid = auth.currentUser?.uid;
      const timestamp = Date.now();
      const filePath = `videos/${uid}/${timestamp}_${video.name}`;
      const storageRef = ref(getStorage(), filePath);

      await uploadBytes(storageRef, blob);

      await addDoc(collection(db, 'videos'), {
        userId: uid,
        filePath,
        originalName: video.name,
        createdAt: serverTimestamp(),
        likes: 0,
        comments: []
      });

      Alert.alert('Onnistui', 'Video ladattu onnistuneesti!');
      setVideo(null);
    } catch (error) {
      console.error(error);
      Alert.alert('Virhe', 'Videon lataus epäonnistui');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Valitse video" onPress={pickVideo} />
      {video && <Text style={styles.info}>Valittu: {video.name}</Text>}
      <Button title="Lataa video" onPress={uploadVideo} disabled={!video} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  info: { marginVertical: 10, fontSize: 14 }
});
