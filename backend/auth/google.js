import dotenv from 'dotenv';
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({ path: envFile });

import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { findOrCreateUser } from '../models/userStore.js';

const router = express.Router();
const CLIENT_URL = process.env.CLIENT_URL;

const callbackURL = `${process.env.SERVER_URL}/auth/google/callback`;

console.log("Google OAuth callback URL:", callbackURL);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await findOrCreateUser(profile);
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

import { getUserById } from '../models/userStore.js';

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (err) {
    console.error("❌ Failed to deserialize user:", err);
    done(err);
  }
});


router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
  }),
  (req, res) => {
    console.log("✅ Google callback hit. Session:", req.session);
    console.log("🌐 Redirecting to:", process.env.CLIENT_URL + '/meltview');
    res.redirect(process.env.CLIENT_URL + '/meltview');
  }
);

export default router;