
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, TextInput, StyleSheet } from 'react-native';
import { auth } from './firebase';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from './firebase';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from './firebase';
import ChangeProfilePicture from './ChangeProfilePicture';

{isOwnProfile && (
  <>
    <ChangeProfilePicture onUploadSuccess={() => {
      // Hae uusi kuva uudelleen
      setPhotoURL(null);
    }} />
  </>
)}



export default function UserProfile({ route }) {
  const [userData, setUserData] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);

  const userId = route?.params?.userId || auth.currentUser?.uid;
  const currentUserId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData(data);
        setNewName(data.name || '');
        if (data.photoPath) {
          const url = await getDownloadURL(ref(storage, data.photoPath));
          setPhotoURL(url);
        }
      }

      if (userId !== currentUserId) {
        const currentUserRef = doc(db, 'users', currentUserId);
        const currentUserSnap = await getDoc(currentUserRef);
        if (currentUserSnap.exists()) {
          const currentUserData = currentUserSnap.data();
          setIsFollowing(currentUserData.following?.includes(userId));
        }
      }
    };
    fetchData();
  }, [userId]);

  const handleSave = async () => {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, { name: newName });
    setUserData({ ...userData, name: newName });
    setEditing(false);
  };

  const handleFollow = async () => {
    const currentUserRef = doc(db, 'users', currentUserId);
    await updateDoc(currentUserRef, {
      following: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
    });
    setIsFollowing(!isFollowing);
  };

  const isOwnProfile = userId === currentUserId;

  return (
    <View style={styles.container}>
      {photoURL && <Image source={{ uri: photoURL }} style={styles.avatar} />}

      {editing ? (
        <TextInput
          value={newName}
          onChangeText={setNewName}
          style={styles.input}
        />
      ) : (
        <Text style={styles.name}>{userData?.name || 'Tuntematon käyttäjä'}</Text>
      )}

      <Text style={styles.email}>{userData?.email}</Text>

      {isOwnProfile && (
        editing ? (
          <Button title="Tallenna" onPress={handleSave} />
        ) : (
          <Button title="Muokkaa nimeä" onPress={() => setEditing(true)} />
        )
      )}

      {!isOwnProfile && (
        <Button
          title={isFollowing ? 'Lopeta seuraaminen' : 'Seuraa käyttäjää'}
          onPress={handleFollow}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 10 },
  name: { fontSize: 20, fontWeight: 'bold' },
  email: { fontSize: 16, color: '#555' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, width: '80%', marginBottom: 10 }
});
