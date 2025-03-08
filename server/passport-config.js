const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const { User } = require('./models');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id).then(user => {
    done(null, user);
  }).catch(err => done(err));
});

passport.use(new DiscordStrategy({
  clientID: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  callbackURL: process.env.DISCORD_CALLBACK_URL,
  scope: ['identify']
}, (accessToken, refreshToken, profile, done) => {
  User.findOrCreate({ where: { discordId: profile.id }, defaults: { username: profile.username } })
    .then(([user]) => done(null, user))
    .catch(err => done(err));
}));