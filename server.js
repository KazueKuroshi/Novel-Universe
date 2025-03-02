const express = require('express');
const cors = require('cors');
const scrapeNovelData = require('./src/scraper');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Endpoint untuk scraping data dari beberapa URL
app.get('/api/novel', async (req, res) => {
    const urls = req.query.url; // Array URL dari query parameter
    if (!urls) {
        return res.status(400).json({ error: 'URLs are required' });
    }

    try {
        const urlList = Array.isArray(urls) ? urls : [urls]; // Pastikan urls adalah array
        const results = [];

        for (const url of urlList) {
            const novelData = await scrapeNovelData(url);
            if (novelData) {
                results.push(novelData);
            }
        }

        res.json(results);
    } catch (error) {
        console.error('Error scraping data:', error);
        res.status(500).json({ error: 'Failed to scrape data' });
    }
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
