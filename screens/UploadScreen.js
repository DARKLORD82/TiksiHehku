// UploadScreen.js
import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '../firebaseApp';

export default function UploadScreen() {
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('');

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      uploadVideo(result.assets[0].uri);
    } else {
      setStatus('Videon valinta peruutettu.');
    }
  };

  const uploadVideo = async (uri) => {
    try {
      setUploading(true);
      setStatus('Ladataan videota...');

      const blob = await (await fetch(uri)).blob();
      const filename = uri.split('/').pop();
      const storage = getStorage(app);
      const storageRef = ref(storage, `videos/${filename}`);

      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      const firestore = getFirestore(app);
      const auth = getAuth(app);
      const user = auth.currentUser;

      await addDoc(collection(firestore, 'videos'), {
        url: downloadURL,
        userId: user ? user.uid : 'tuntematon',
        timestamp: serverTimestamp(),
      });

      setStatus('✅ Video ladattu onnistuneesti!');
    } catch (error) {
      console.error('Videon latausvirhe:', error);
      setStatus('❌ Videon lataus epäonnistui.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Valitse ja lataa video" onPress={pickVideo} />
      {uploading && <ActivityIndicator size="large" color="#0000ff" />}
      <Text style={styles.status}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  status: {
    marginTop: 20,
    textAlign: 'center',
  },
});
