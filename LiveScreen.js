// Live-videon ja tykkäysten näyttö tähän
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LiveScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🔴 Live-näkymä toimii!</Text>
      <Text style={styles.text}>Tähän tulee LiveKit-striimi ja tykkäykset.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  text: { fontSize: 20 },
});