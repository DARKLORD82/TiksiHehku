// LiveKitSwitcher.js
import { Platform } from 'react-native';

let LiveKitComponent;

if (Platform.OS === 'web') {
  LiveKitComponent = require('./LiveWebView').default;
} else {
  LiveKitComponent = require('./LiveMobileView').default;
}

export default LiveKitComponent;