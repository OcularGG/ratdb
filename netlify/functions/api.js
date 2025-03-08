const express = require('express');
const serverless = require('serverless-http');
const app = express();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
);

app.use(express.json());

app.get('/.netlify/functions/api/search', async (req, res) => {
  const { term } = req.query;
  const { data, error } = await supabase
    .rpc('search_all_servers', { search_term: term });
  
  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
});

module.exports.handler = serverless(app);