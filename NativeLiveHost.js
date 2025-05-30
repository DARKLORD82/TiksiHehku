// NativeLiveHost.js
import React from 'react';
import { View, Text, Platform } from 'react-native';

export default function NativeLiveHost() {
  return (
    <View style={{ padding: 20 }}>
      <Text>
        {Platform.OS === 'web'
          ? 'LiveKit Native ei tuettu Webissä.'
          : 'LiveKit Native toimii mobiilissa (Android/iOS).'}
      </Text>
    </View>
  );
}
  const message = Platform.select({
  web: 'Webissä käytetään LiveViewerScreen.js',
  default: 'Mobiilissa käytetään NativeLiveHost.js',
});