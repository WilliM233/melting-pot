import express from 'express';
import session from 'express-session';
import passport from 'passport';

import './auth/google.js';
import authRoutes from './auth/google.js';
import userRoutes from './routes/user.js';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();
import { connectMongo } from './utils/connectMongo.js';
import mongoose from 'mongoose';


const CLIENT_URL = process.env.CLIENT_URL;

const app = express();
app.use(express.json({ limit: "5mb" }));
app.set('trust proxy', 1); // trust first proxy
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));

console.log("CORS allowed origin:", CLIENT_URL);
console.log("Server URL:", process.env.SERVER_URL);

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        domain: process.env.NODE_ENV === 'production' ? '.meltingpointproductions.com' : undefined
      },
    })
  );

  app.use((req, res, next) => {
    console.log("Incoming cookies:", req.headers.cookie);
    console.log("Session:", req.session);
    next();
  });

  
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.use('/auth', authRoutes);
  app.use('/api', userRoutes);

  app.get("/health", async (req, res) => {
    try {
      await mongoose.connection.db.admin().ping();
      res.status(200).json({ status: "ok", db: "connected" });
    } catch (err) {
      res.status(500).json({ status: "error", message: "Mongo unavailable", error: err.message });
    }
  });

  await connectMongo();

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  app.use((req, res, next) => {
  console.log("Session check:", req.session);
  next();
  });
  