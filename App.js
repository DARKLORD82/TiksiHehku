import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';

initializeApp(firebaseConfig);
const auth = getAuth();
const Drawer = createDrawerNavigator();

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNew, setIsNew] = useState(false);

  const handleAuth = async () => {
    try {
      if (isNew) await createUserWithEmailAndPassword(auth, email, password);
      else await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{isNew ? 'Rekisteröidy' : 'Kirjaudu sisään'}</Text>
      <TextInput style={styles.input} placeholder="Sähköposti" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Salasana" secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity onPress={handleAuth} style={styles.button}><Text style={styles.buttonText}>{isNew ? 'Luo tili' : 'Kirjaudu'}</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => setIsNew(!isNew)}><Text style={styles.link}>{isNew ? 'Onko sinulla jo tili?' : 'Ei tiliä? Rekisteröidy'}</Text></TouchableOpacity>
    </SafeAreaView>
  );
}

function HomeScreen() {
  return <SafeAreaView style={styles.screen}><Text style={styles.text}>🏠 Etusivu – TiksiHehku Web</Text></SafeAreaView>;
}
function LiveScreen() {
  return <SafeAreaView style={styles.screen}><Text style={styles.text}>📺 Live-lähetys</Text></SafeAreaView>;
}
function ChatScreen() {
  return <SafeAreaView style={styles.screen}><Text style={styles.text}>💬 Chat</Text></SafeAreaView>;
}
function ProfileScreen({ onLogout }) {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.text}>👤 Profiili</Text>
      <TouchableOpacity onPress={onLogout}><Text style={styles.link}>Kirjaudu ulos</Text></TouchableOpacity>
    </SafeAreaView>
  );
}

export default function App() 
 const [user, setUser] = useState(null);
  useEffect(() => {
    console.log("Checking user authentication...");
    const unsub = onAuthStateChanged(auth, setUser); => { 
      console.log("User state changed:", user);
      setUser(user);
    });
    return () => unsub();
  }, []);
  if (!user) {
    console.log("Rendering login screen");
    return <LoginScreen onLogin={() => setUser(true)} />;
  console.log("Rendering navigation drawer...");
  return (
    <NavigationContainer>
      <Drawer.Navigator
        <Drawer.Screen name="Koti" component={HomeScreen} />
        <Drawer.Screen name="Live" component={LiveScreen} />
        <Drawer.Screen name="Chat" component={ChatScreen} />
        <Drawer.Screen name="Profiili" children={() => <ProfileScreen onLogout={() => signOut(auth)} />} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
      screenOptions={{
          drawerType: 'front',
          drawerStyle: { backgroundColor: '#001F3F', width: 90 },
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#ccc',
          drawerLabelStyle: { display: 'none' }
        }}>
        <Drawer.Screen name="Koti" component={HomeScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> }} />
        <Drawer.Screen name="Live" component={LiveScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="radio" size={24} color={color} /> }} />
        <Drawer.Screen name="Chat" component={ChatScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="chatbubble" size={24} color={color} /> }} />
        <Drawer.Screen name="Profiili" children={() => <ProfileScreen onLogout={() => signOut(auth)} />} options={{ drawerIcon: ({ color }) => <Ionicons name="person" size={24} color={color} /> }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { borderWidth: 1, padding: 10, marginVertical: 8 },
  button: { backgroundColor: '#0066ff', padding: 12, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' },
  link: { color: '#0066ff', textAlign: 'center', marginTop: 10 },
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 22 }
});
