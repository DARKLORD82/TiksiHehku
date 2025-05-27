import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

i18n.translations = {
  fi: {
    home: 'Koti',
    profile: 'Profiili',
    live: 'Live',
    slogan: 'Missä ideat virtaavat – ilman turhaa sensuuria.',
    home_text: 'Tervetuloa TiksiHehkuun!',
    profile_text: 'Tässä näkyy käyttäjäprofiilisi.',
    live_text: 'Tervetuloa live-näkymään.',
  },
  en: {
    home: 'Home',
    profile: 'Profile',
    live: 'Live',
    slogan: 'Where ideas flow – without unnecessary censorship.',
    home_text: 'Welcome to TiksiHehku!',
    profile_text: 'This is your profile.',
    live_text: 'Welcome to the live section.',
  },
  se: {
    home: 'Hem',
    profile: 'Profil',
    live: 'Live',
    slogan: 'Där idéer flödar – utan onödig censur.',
    home_text: 'Välkommen till TiksiHehku!',
    profile_text: 'Detta är din profil.',
    live_text: 'Välkommen till livesektionen.',
  },
};

i18n.locale = Localization.locale.slice(0, 2);
i18n.fallbacks = true;

export default i18n;
