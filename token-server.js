// token-server.js

const express = require('express');
const cors = require('cors');
const { AccessToken } = require('livekit-server-sdk');

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = 'APIyBUUXentHom8';
const apiSecret = '8xclzZT10dePXUH98HqLy5GmGz518UAi82rnYJ9w3de';
const port = 3001;

// ✅ Selainystävällinen viesti
app.get('/', (req, res) => {
  res.send('✅ LiveKit token server toimii. Lähetä POST /token saadaksesi tokenin.');
});

// 🎯 Token-pyyntö
app.post('/token', (req, res) => {
  const { identity, room } = req.body;

  if (!identity || !room) {
    return res.status(400).json({ error: 'identity ja room vaaditaan' });
  }

  const at = new AccessToken(apiKey, apiSecret, {
    identity,
  });

  at.addGrant({
    roomJoin: true,
    room,
    canPublish: true,
    canSubscribe: true,
  });

  const token = at.toJwt();
  res.json({ token });
});

app.listen(port, () => {
  console.log(`✅ LiveKit token server pyörii osoitteessa http://localhost:${port}`);
});