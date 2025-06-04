// i18n.js
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

i18n.translations = {
  fi: {
    welcome: 'Tervetuloa TiksiHehkuun',
    logout: 'Kirjaudu ulos',
    uploadVideo: 'Valitse ja lataa video',
    profile: 'Oma profiili',
  },
  en: {
    welcome: 'Welcome to TiksiHehku',
    logout: 'Logout',
    uploadVideo: 'Select and Upload Video',
    profile: 'My Profile',
  },
  sv: {
    welcome: 'Välkommen till TiksiHehku',
    logout: 'Logga ut',
    uploadVideo: 'Välj och ladda upp video',
    profile: 'Min profil',
  },
};

i18n.locale = Localization.locale.slice(0, 2);
i18n.fallbacks = true;

export default i18n;
