import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const CommentInput = ({ onSubmit }) => {
  const [comment, setComment] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Kirjoita kommentti..."
        value={comment}
        onChangeText={setComment}
      />
      <Button title="Lähetä" onPress={() => { onSubmit(comment); setComment(''); }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', padding: 5 },
  input: { flex: 1, borderBottomWidth: 1, marginRight: 10 }
});

export default CommentInput;
