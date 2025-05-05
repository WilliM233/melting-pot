const express = require('express');
const router = express.Router();
const media = require('../data/sampleMedia.json');

router.get('/', (req, res) => {
    res.json(media);
});

module.exports = router;