// generateToken.js
const { AccessToken } = require('livekit-server-sdk');

const API_KEY = 'APIyBUUXentHom8';
const API_SECRET = '8xclzZT10dePXUH98HqLy5GmGz518UAi82rnYJ9w3de';

const identity = 'jani_aalto';
const room = 'live-tiksi';

async function generateToken() {
  const token = new AccessToken(API_KEY, API_SECRET, {
    identity,
    ttl: 3600,
  });

  token.addGrant({
    roomJoin: true,
    room,
    canPublish: true,
    canSubscribe: true,
  });

  const jwt = await token.toJwt(); // odota että JWT muodostuu
  console.log('🔑 Generated LiveKit Token:\n');
  console.log(jwt);
}

generateToken(); // Suorita async-funktio
