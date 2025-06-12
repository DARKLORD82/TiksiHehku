import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { auth } from '../firebaseApp';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kirjaudu sisään</Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});