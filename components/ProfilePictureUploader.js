import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, storage, db } from './firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { updateDoc, doc } from 'firebase/firestore';

export default function ProfilePictureUploader() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true });
    if (!result.cancelled) {
      setImage(result.uri);
      const response = await fetch(result.uri);
      const blob = await response.blob();
      const filePath = `avatars/${auth.currentUser.uid}.jpg`;
      const storageRef = ref(storage, filePath);
      await uploadBytes(storageRef, blob);
      await updateDoc(doc(db, 'users', auth.currentUser.uid), { photoPath: filePath });
    }
  };

  return (
    <View>
      {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
      <Button title="Valitse profiilikuva" onPress={pickImage} />
    </View>
  );
}