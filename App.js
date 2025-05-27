import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { auth } from './firebaseApp';
import LoginScreen from './LoginScreen';
import VideoFeed from './VideoFeed';
import LiveScreen from './LiveScreen';
import UserProfile from './UserProfile';
import i18n from './i18n';
import LiveHostScreen from './LiveHostScreen';
import LiveViewerScreen from './LiveViewerScreen';
import { ensureModeratorAccount } from './ModeratorAuth';

const Drawer = createDrawerNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('fi');

  useEffect(() => {
    ensureModeratorAccount();
  }, []);

  i18n.locale = language;

  if (!user) {
    return <LoginScreen onLogin={setUser} />;
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Koti"
        screenOptions={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                const next = language === 'fi' ? 'en' : language === 'en' ? 'se' : 'fi';
                setLanguage(next);
              }}
              style={{ marginRight: 15 }}
            >
              <Text>{language.toUpperCase()}</Text>
            </TouchableOpacity>
          ),
        }}
      >
        <Drawer.Screen name={i18n.t('home')} component={VideoFeed} />
        <Drawer.Screen name={i18n.t('live')} component={LiveScreen} />
        <Drawer.Screen name={i18n.t('profile')} component={UserProfile} />
        <Drawer.Screen name="LiveHost" component={LiveHostScreen} />
        <Drawer.Screen name="LiveViewer" component={LiveViewerScreen} />
       </Drawer.Navigator>
        <Drawer.Screen name="Upload" component={UploadVideo} />
        <Drawer.Screen name="home" component={VideoFeed} />
        <Drawer.Screen name="profile" component={UserProfile} />
    </NavigationContainer>
  );
}