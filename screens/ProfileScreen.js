import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, Alert } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../firebaseApp';
import LanguageSelector from '../components/LanguageSelector';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Alert.alert('Uloskirjautuminen', 'Olet kirjautunut ulos.');
      })
      .catch((error) => {
        console.error('Uloskirjautumisvirhe:', error);
        Alert.alert('Virhe', 'Uloskirjautuminen epäonnistui.');
      });
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Ladataan käyttäjätietoja...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Oma profiili</Text>
      <Text style={styles.info}>Sähköposti: {user.email}</Text>
      <Text style={styles.info}>UID: {user.uid}</Text>
      {user.photoURL ? (
        <Image source={{ uri: user.photoURL }} style={styles.image} />
      ) : (
        <Text style={styles.info}>Profiilikuvaa ei asetettu.</Text>
      )}
      <Button title="Kirjaudu ulos" onPress={handleLogout} color="#D32F2F" />
      <LanguageSelector />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 20,
    marginBottom: 20,
  },
  loading: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default ProfileScreen;