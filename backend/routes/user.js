import express from 'express';

const router = express.Router();

router.get('/me', (req, res) => {
  console.log("🔍 /api/me called. isAuthenticated:", req.isAuthenticated?.(), "user:", req.user);
  
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
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