import React from 'react';
import { View, Text, Button, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db, auth } from './firebaseApp';

export default function UploadVideo() {
  const handlePickAndUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*',
        copyToCacheDirectory: true,
      });

      if (result.type === 'cancel') return;

      const fileUri = result.uri;
      const fileName = `${Date.now()}_${result.name}`;
      const fileRef = ref(storage, `videos/${fileName}`);

      const response = await fetch(fileUri);
      const blob = await response.blob();

      const uploadTask = uploadBytesResumable(fileRef, blob);

      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        error => {
          console.error('Upload failed:', error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(collection(db, 'videos'), {
            url: downloadURL,
            userId: auth.currentUser?.uid || null,
            createdAt: serverTimestamp(),
          });
          alert('✅ Video uploaded!');
        }
      );
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>🎬 Upload Video</Text>
      <Button title="Pick and Upload Video" onPress={handlePickAndUpload} />
    </View>
  );
}