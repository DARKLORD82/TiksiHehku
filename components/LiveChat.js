import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const LiveChat = ({ messages }) => (
  <ScrollView style={styles.chatContainer}>
    {messages.map((msg, index) => (
      <Text key={index} style={styles.message}>{msg.user}: {msg.text}</Text>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  chatContainer: { height: 200, backgroundColor: '#eee', padding: 10 },
  message: { marginBottom: 5 }
});

export default LiveChat;
