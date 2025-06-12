import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Room, Participant, Track } from 'livekit-client';
import { LiveKitRoom } from '@livekit/react-native';

export default function LiveViewerScreen() {
  const [connected, setConnected] = useState(false);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Kovakoodattu LiveKit-token (katso että voimassa)
    const viewerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJ2aWRlbyI6eyJyb29tSm9pbiI6dHJ1ZSwicm9vbSI6ImxpdmUtdGlrc2kiLCJjYW5QdWJsaXNoIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWV9LCJpc3MiOiJBUEl5QlVVWGVudEhvbTgiLCJleHAiOjE3NDkwNTAzMDYsIm5iZiI6MCwic3ViIjoiamFuaV9hYWx0byJ9.OG_wPmyttUN8cJf9y33GxF7CbNNPhdTxFlHP1wXdFQY';
    setToken(viewerToken);
    setConnected(true);
  }, []);

  if (!connected) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Yhdistetään lähetykseen...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {token ? (
        <LiveKitRoom
          token={token}
          serverUrl="wss://tiksihehku-ivm01d0v.livekit.cloud"
          connect
          adaptiveStream
          style={{ flex: 1 }}
        />
      ) : (
        <Text style={styles.centered}>Token puuttuu</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});