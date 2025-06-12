import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const LikeButton = ({ likes, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text>❤️ {likes}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: { padding: 10 }
});

export default LikeButton;
