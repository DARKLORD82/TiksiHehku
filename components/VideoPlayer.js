import React from 'react';
import { Video } from 'expo-av';
import { View, StyleSheet } from 'react-native';

const VideoPlayer = ({ uri }) => (
  <View style={styles.container}>
    <Video
      source={{ uri }}
      useNativeControls
      resizeMode="contain"
      style={{ width: '100%', height: 300 }}
      shouldPlay
    />
  </View>
);

const styles = StyleSheet.create({
  container: { marginVertical: 10 }
});

export default VideoPlayer;
