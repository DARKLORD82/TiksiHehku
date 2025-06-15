// i18n.js
import i18n from 'i18n-js';
import * as Localization from 'expo-localization';

i18n.fallbacks = true;
i18n.defaultLocale = 'fi'; // Ensisijainen kieli
i18n.locale = Localization.locale ?? 'fi';

// Suomenkieliset käännökset
i18n.translations.fi = {
  home: {
    title: "Tervetuloa TiksiHehkuun – missä asiat virtaavat ilman turhaa sensuuria",
    subtitle: "Aloita katsomalla videoita tai siirry liveen!",
  },
  login: {
    title: "Kirjaudu sisään",
    email: "Sähköposti",
    password: "Salasana",
    button: "Kirjaudu",
    registerLink: "Eikö sinulla ole vielä tiliä? Luo tili",
    error: "Kirjautumisvirhe",
  },
  register: {
    title: "Luo tili",
    email: "Sähköposti",
    password: "Salasana",
    button: "Rekisteröidy",
    loginLink: "Onko sinulla jo tili? Kirjaudu",
    success: "Rekisteröinti onnistui",
    error: "Virhe",
  },
  settings: {
    title: "Asetukset",
    logout: "Kirjaudu ulos",
    logoutError: "Virhe uloskirjautumisessa",
  },
  upload: {
    button: "Valitse ja lataa video",
    uploading: "Ladataan videota...",
    success: "✅ Video ladattu onnistuneesti!",
    error: "❌ Videon lataus epäonnistui.",
    canceled: "Videon valinta peruutettu.",
  },
  live: {
    mobileTitle: "Live-lähetys (Mobiili)",
    webTitle: "Live-lähetys (Web)",
    status: "🔴 Kamera päällä – olet lähetyksessä",
    connecting: "Yhdistetään huoneeseen...",
  },
};

// Ruotsinkieliset käännökset
i18n.translations.sv = {
  home: {
    title: "Välkommen till TiksiHehku – där idéer flödar utan onödig censur",
    subtitle: "Börja titta på videor eller gå live!",
  },
  login: {
    title: "Logga in",
    email: "E-post",
    password: "Lösenord",
    button: "Logga in",
    registerLink: "Har du inget konto? Registrera dig",
    error: "Inloggningsfel",
  },
  register: {
    title: "Skapa konto",
    email: "E-post",
    password: "Lösenord",
    button: "Registrera dig",
    loginLink: "Har du redan ett konto? Logga in",
    success: "Registrering lyckades",
    error: "Fel",
  },
  settings: {
    title: "Inställningar",
    logout: "Logga ut",
    logoutError: "Utloggningsfel",
  },
  upload: {
    button: "Välj och ladda upp video",
    uploading: "Laddar upp video...",
    success: "✅ Video uppladdad!",
    error: "❌ Video uppladdning misslyckades.",
    canceled: "Videoval avbröts.",
  },
  live: {
    mobileTitle: "Live-sändning (Mobil)",
    webTitle: "Live-sändning (Web)",
    status: "🔴 Kameran är på – du sänder",
    connecting: "Ansluter till rummet...",
  },
};

// Englanninkieliset käännökset
i18n.translations.en = {
  home: {
    title: "Welcome to TiksiHehku – where ideas flow without censorship",
    subtitle: "Start by watching videos or go live!",
  },
  login: {
    title: "Login",
    email: "Email",
    password: "Password",
    button: "Login",
    registerLink: "Don't have an account? Register",
    error: "Login error",
  },
  register: {
    title: "Create Account",
    email: "Email",
    password: "Password",
    button: "Register",
    loginLink: "Already have an account? Login",
    success: "Registration successful",
    error: "Error",
  },
  settings: {
    title: "Settings",
    logout: "Logout",
    logoutError: "Logout error",
  },
  upload: {
    button: "Choose and upload video",
    uploading: "Uploading video...",
    success: "✅ Video uploaded successfully!",
    error: "❌ Video upload failed.",
    canceled: "Video selection canceled.",
  },
  live: {
    mobileTitle: "Live Stream (Mobile)",
    webTitle: "Live Stream (Web)",
    status: "🔴 Camera is on – you're live",
    connecting: "Connecting to room...",
  },
};

export default i18n;