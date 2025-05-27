import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RoomProvider, useRoom, ParticipantView } from 'livekit-react-native';
import LiveCommentsOverlay from './LiveCommentsOverlay';
import LiveLikeOverlay from './LiveLikeOverlay';

const LiveSession = ({ token, url }) => {
  const { room, connect } = useRoom();

  React.useEffect(() => {
    connect(url, token);
  }, []);

  return (
    <View style={styles.videoContainer}>
      <ParticipantView participant={room?.localParticipant} style={styles.video} />
      <>
        <LiveCommentsOverlay roomId={'room123'} />
        <LiveLikeOverlay roomId={'room123'} />
      </>
    </View>
  );
};

export default function LiveViewerScreen() {
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ2aWRlbyI6eyJyb29tSm9pbiI6dHJ1ZSwicm9vbSI6ImxpdmUtdGlrc2kiLCJjYW5QdWJsaXNoIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWV9LCJpc3MiOiJBUEl5QlVVWGVudEhvbTgiLCJleHAiOjE3NDgzNjczNzcsIm5iZiI6MCwic3ViIjoiamFuaV9hYWx0byJ9.iF1NcKbJse8gsUYpFv2mwWMaxt_NcqRJgvzX2vXB-5M';
  const url = 'wss://tiksihehku-ivm01d0v.livekit.cloud';

  return (
    <RoomProvider>
      <LiveSession token={token} url={url} />
    </RoomProvider>
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  video: {
    flex: 1,
  },
});