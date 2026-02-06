const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors()); // Allows Frontend to talk to Backend

// Core Route: Get cleaned stock data
app.get('/api/stocks', (req, res) => {
    fs.readFile('./cleaned_data.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Data file not found." });
        }
        res.json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`FinBud AI Server running at http://localhost:${PORT}`);
});