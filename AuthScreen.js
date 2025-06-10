import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { auth, db } from './firebaseApp';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

export default function AuthScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        onLogin(auth.currentUser);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email,
          createdAt: new Date().toISOString()
        });
        onLogin(userCredential.user);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isLogin ? 'Kirjaudu sisään' : 'Luo tili'}</Text>
      <TextInput style={styles.input} placeholder="Sähköposti" onChangeText={setEmail} value={email} />
      <TextInput style={styles.input} placeholder="Salasana" secureTextEntry onChangeText={setPassword} value={password} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title={isLogin ? 'Kirjaudu' : 'Rekisteröidy'} onPress={handleAuth} />
      <Text style={styles.link} onPress={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Ei tiliä? Rekisteröidy' : 'On jo tili? Kirjaudu'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 100 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  error: { color: 'red', marginBottom: 10 },
  link: { color: 'blue', marginTop: 15, textAlign: 'center' }
});