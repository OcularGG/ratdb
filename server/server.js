const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { Sequelize } = require('sequelize');
const db = require('./db');
const authRoutes = require('./routes/auth');

require('dotenv').config();
require('./passport-config');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Albion ratDB');
});

db.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});