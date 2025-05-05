const express = require('express');
const cors = require('cors');
const app = express();
const mediaRoutes = require('./routes/media');

app.use(cors());
app.use('/api/media', mediaRoutes);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});