
import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth } from './firebase';
import { db } from './firebase';
import { doc, updateDoc } from 'firebase/firestore';

export default function ChangeProfilePicture({ onUploadSuccess }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    const response = await fetch(image);
    const blob = await response.blob();
    const uid = auth.currentUser?.uid;
    const filePath = `profilePics/${uid}.jpg`;
    const storageRef = ref(getStorage(), filePath);

    try {
      await uploadBytes(storageRef, blob);
      await updateDoc(doc(db, 'users', uid), {
        photoPath: filePath,
      });
      if (onUploadSuccess) onUploadSuccess();
      Alert.alert('Onnistui', 'Profiilikuva päivitetty!');
    } catch (error) {
      console.error(error);
      Alert.alert('Virhe', 'Kuvan lataus epäonnistui');
    }
  };

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.preview} />}
      <Button title="Valitse kuva" onPress={pickImage} />
      <Button title="Lataa kuva" onPress={uploadImage} disabled={!image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 10 },
  preview: { width: 120, height: 120, borderRadius: 60, marginVertical: 10 },
});
