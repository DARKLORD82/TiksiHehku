// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const cfg = getDefaultConfig(__dirname);

// Lisätään CJS-päätteille tuki
cfg.resolver.sourceExts.push('cjs');
module.exports = cfg;



