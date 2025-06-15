// metro.config.js (Expo SDK 53 / RN 0.79+)
const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ota .cjs-tiedostopäätteet mukaan resolvointiin:
config.resolver.sourceExts.push('cjs');

// Poista package.json "exports" -kentän pakotettu käyttö (palataan vanhaan resolvointiin):
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
