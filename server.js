require('dotenv').config();

const express = require('express');
const app = express();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const discordClientId = process.env.DISCORD_CLIENT_ID;
const discordClientSecret = process.env.DISCORD_CLIENT_SECRET;
const discordRedirectUri = process.env.DISCORD_REDIRECT_URI;

app.get('/', (req, res) => {
  res.send('Environment variables are loaded!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});