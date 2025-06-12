import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Tämä toimii vain mobiilissa
import i18n from '../i18n';

const LanguageSelector = () => {
  const handleChange = (lang) => {
    i18n.locale = lang;
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        <select onChange={(e) => handleChange(e.target.value)} defaultValue={i18n.locale}>
          <option value="fi">Suomi</option>
          <option value="en">English</option>
          <option value="sv">Svenska</option>
        </select>
      ) : (
        <Picker
          selectedValue={i18n.locale}
          style={{ height: 50, width: 200 }}
          onValueChange={(itemValue) => handleChange(itemValue)}
        >
          <Picker.Item label="Suomi" value="fi" />
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Svenska" value="sv" />
        </Picker>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});

export default LanguageSelector;