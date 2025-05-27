
import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const storage = getStorage();
const auth = getAuth();
const db = getFirestore();

export default function ProfilePicture() {
  const [imageUrl, setImageUrl] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      const response = await fetch(uri);
      const blob = await response.blob();
      const uid = auth.currentUser.uid;
      const imageRef = ref(storage, `profile_pictures/${uid}.jpg`);
      await uploadBytes(imageRef, blob);
      const downloadURL = await getDownloadURL(imageRef);
      setImageUrl(downloadURL);
      await setDoc(doc(db, "users", uid), { photoURL: downloadURL }, { merge: true });
    }
  };

  return (
    <View style={{ alignItems: 'center' }}>
      {imageUrl && <Image source={{ uri: imageUrl }} style={{ width: 100, height: 100, borderRadius: 50 }} />}
      <Button title="Valitse profiilikuva" onPress={pickImage} />
    </View>
  );
}
