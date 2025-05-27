
import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const db = getFirestore();

export default function UserSearch() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const navigation = useNavigation();

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("email", ">=", search), where("email", "<=", search + ""));
    const snapshot = await getDocs(q);
    setResults(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Etsi käyttäjää sähköpostilla"
        value={search}
        onChangeText={setSearch}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <TouchableOpacity onPress={handleSearch}><Text>🔍 Etsi</Text></TouchableOpacity>
      <FlatList
        data={results}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Profiili", { userId: item.id })}>
            <Text>{item.email}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
