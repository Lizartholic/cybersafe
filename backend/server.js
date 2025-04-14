const express = require('express');
const app = express();
const PORT = 5500;

// Define API endpoints
app.get('/api', (req, res) => {
    res.json({ message: 'Hello, this is your API!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`API is running on http://127.0.0.1:${PORT}/api`);
});