import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import firebase from '../firebaseApp';

const SettingsScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      Alert.alert('Virhe uloskirjautumisessa', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asetukset</Text>
      <Button title="Kirjaudu ulos" onPress={handleLogout} color="#d9534f" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
});

export default SettingsScreen;