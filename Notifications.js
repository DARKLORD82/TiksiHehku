
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const db = getFirestore(getApp());
const auth = getAuth(getApp());

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setNotifications(data.notifications || []);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔔 Ilmoitukset</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>👤 {item.from} alkoi seuraamaan sinua</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  item: { padding: 10, borderBottomWidth: 1, borderColor: '#ddd' }
});
