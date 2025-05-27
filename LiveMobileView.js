// LiveMobileView.js
import React from 'react';
import { View, Text } from 'react-native';
import { RoomProvider, useRoom } from 'livekit-react-native';

export default function LiveMobileView() {
  const token = 'YOUR_MOBILE_TOKEN_HERE';
  const url = 'wss://tiksihehku-ivm01d0v.livekit.cloud';

  return (
    <RoomProvider token={token} url={url}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Live Mobile Stream</Text>
        {/* Add video and chat components here */}
      </View>
    </RoomProvider>
  );
}