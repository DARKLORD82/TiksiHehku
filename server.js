const express = require('express');
const cors = require('cors');
const { AccessToken } = require('livekit-server-sdk');

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = 'APIyBUUXentHom8';
const apiSecret = '8xclzZT10dePXUH98HqLy5GmGz518UAi82rnYJ9w3de';

app.post('/token', (req, res) => {
  const { identity, room } = req.body;
  const token = new AccessToken(apiKey, apiSecret, {
    identity,
    ttl: 3600,
  });
  token.addGrant({ roomJoin: true, room });

  res.json({ token: token.toJwt() });
});

app.listen(3001, () => {
  console.log('Token server running on http://localhost:3001');
});
