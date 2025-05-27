# 🔥 TiksiHehku – Sosiaalisen median sovellus

**Päivitetty:** 26.05.2025

TiksiHehku on suomalainen, moderni ja monikielinen sosiaalisen median sovellus. Tämä dokumentaatio kattaa kaikki keskeiset komponentit ja asetukset, joita projekti tarvitsee toimiakseen webissä, Androidissa ja iOS:ssä.

---

## 🔧 Perustiedostot

| Tiedosto | Tarkoitus |
|----------|-----------|
| `App.js` | Sovelluksen sisäänkäynti, navigointi ja kieliasetukset |
| `app.json` | Expo-konfiguraatio (nimi, splash, ikoni jne.) |
| `package.json` | Projektin riippuvuudet ja käynnistysskriptit |
| `firebase.json` | Firebase-hosting konfiguraatio |
| `.firebaserc` | Firebase-projektin nimi |

---

## 🔐 Firebase & Autentikointi

| Tiedosto | Tarkoitus |
|----------|-----------|
| `firebaseApp.js` | Firebase-sovelluksen alustaminen |
| `firebaseConfig.js` | Firebase-avaimet |
| `LoginScreen.js` | Käyttäjän kirjautumisnäyttö |
| `AuthScreen.js` | Rekisteröinti- ja kirjautumisnäkymä yhdistettynä (valinnainen) |

---

## 🧑 Profiilit ja seuraus

| Tiedosto | Tarkoitus |
|----------|-----------|
| `UserProfile.js` | Profiilinäkymä |
| `ProfilePictureUploader.js` | Kuvan lataus Firebasen Storageen |
| `ProfilePicture.js` | Profiilikuvan näyttö |
| `FollowButton.js` | Seuraa / lopeta seuraaminen |
| `UserSearch.js` | Käyttäjähaku |

---

## 📽️ Video & Kommentointi

| Tiedosto | Tarkoitus |
|----------|-----------|
| `VideoFeed.js` | TikTok-tyylinen feedi (swipe) |
| `VideoPlayer.js` | Videon toisto |
| `UploadVideo.js` | Lataa video Firebaseen |
| `CommentSection.js` | Videoiden kommentointi |
| `LikeButton.js` | Tykkäystoiminto |

---

## 🔴 LiveKit – Live-lähetys

| Tiedosto | Tarkoitus |
|----------|-----------|
| `LiveHostScreen.js` | Isännän näkymä |
| `LiveViewerScreen.js` | Katsojan näkymä |
| `LiveSession.js` | LiveKit-huoneen yhteys ja toisto |
| `LiveChat.js`, `LiveCommentsOverlay.js` | Kommentointi ruudulla |
| `LiveLike.js`, `LiveLikeButton.js`, `LiveLikeOverlay.js` | Tykkäykset live-näkymässä |
| `LiveKitSwitcher.js` | Valitsee Web/Mobile live-komponentin |
| `LiveWebView.js`, `LiveMobileView.js` | Alustakohtaiset näkymät |

---

## 🌐 Käännökset & UI

| Tiedosto | Tarkoitus |
|----------|-----------|
| `i18n.js` | FI / EN / SE käännökset |
| `favicon.png`, `icon.png`, `splash.png` | Käyttöliittymän visuaaliset elementit |

---

## 🧠 Serveri (valinnainen)

| Tiedosto | Tarkoitus |
|----------|-----------|
| `generateToken.js` | LiveKit tokenien generointi palvelimelta käsin |

---

## 📁 Muut

| Tiedosto | Tarkoitus |
|----------|-----------|
| `README.md` | Tämä tiedosto |
| `README.txt` | Vanhempi versio tai tiivistelmä |

---

## 🔚 Yhteenveto

Tämä README toimii projektin ytimenä. Suosittelemme säilyttämään tämän mukana kaikissa ZIP-paketeissa ja versiopäivityksissä.

TiksiHehku – “Missä ideat virtaavat – ilman turhaa sensuuria.”
