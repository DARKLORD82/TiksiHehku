import { Platform } from 'react-native';
import LiveScreen from './screens/LiveScreen';

let Component;

if (Platform.OS === 'web') {
  Component = require('./LiveViewerScreen').default;
} else {
  Component = require('./NativeLiveHost').default;
}

export default Componen