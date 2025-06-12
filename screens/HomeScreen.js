// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tervetuloa TiksiHehkuun Missä asiat virtaavat ilman turhaa Sensuuria</Text>
      <Text style={styles.subtitle}>Aloita katsomalla videoita tai siirry liveen!</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 12,
    fontSize: 16,
    color: '#555',
  },
});



export default HomeScreen;