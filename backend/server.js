import dotenv from 'dotenv';
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({ path: envFile });

import express from 'express';
import session from 'express-session';
import passport from 'passport';

import './auth/google.js';
import authRoutes from './auth/google.js';
import userRoutes from './routes/user.js';
import cors from 'cors';

const CLIENT_URL = process.env.CLIENT_URL;

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));

console.log("CORS allowed origin:", CLIENT_URL);

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      },
    })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.use('/auth', authRoutes);
  app.use('/api', userRoutes);
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  