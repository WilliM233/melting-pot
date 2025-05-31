import express from 'express';
import UserProfile from '../models/UserProfile.js';

const router = express.Router();

// Google Oauth Route
router.get('/me', (req, res) => {
  console.log("🔍 /api/me called. isAuthenticated:", req.isAuthenticated?.(), "user:", req.user);
  
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

router.get('/profile', async (req, res) => {
  const user = req.user;

  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const profile = await UserProfile.findOne({ userId: user.id });
  if(!profile) {
    return res.json({
      nickname: user.name, // defaults from google
      pronouns: '',
      aboutMe: '',
      profileImageUrl: ''
    });
  }

  res.json(profile);
});

const isValidBase64Image = (str = "") => /^data:image\/(png|jpeg|webp);base64,/.test(str);

router.post('/profile', async (req, res) => {
  const user = req.user;

  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const { nickname, pronouns, aboutMe, profileImageUrl } = req.body;

  const sanitize = (text = "") => text.replace(/[<>]/g, "");


  const safeNickname = nickname?.trim().substring(0, 30);
  const safeAboutMe = sanitize(aboutMe?.trim().substring(0, 300));

  if (profileImageUrl && !isValidBase64Image(profileImageUrl)) {
    return res.status(400).json({ error: "Invalid image format" })
  }

  const updated = await UserProfile.findOneAndUpdate(
    { userId: user.id },
    { nickname: safeNickname, pronouns, aboutMe: safeAboutMe, profileImageUrl },
    { new: true, upsert: true }
  );

  res.json(updated);
});

router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if(err) return next(err);
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Logged out' }); // No redirect!
    });
  });
});

export default router;