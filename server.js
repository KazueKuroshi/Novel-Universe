const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000;

// Aktifkan CORS
app.use(cors());

// Endpoint untuk scraping novel data
app.get('/api/novel', async (req, res) => {
    const url = req.query.url; // URL novel dari query parameter
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        // Ambil HTML dari URL
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        // Contoh: Ambil judul novel
        const title = $('h1.novel-title').text().trim();

        // Contoh: Ambil deskripsi novel
        const description = $('div.novel-description').text().trim();

        // Contoh: Ambil daftar chapter
        const chapters = [];
        $('ul.chapter-list li').each((index, element) => {
            const chapterTitle = $(element).find('a').text().trim();
            const chapterUrl = $(element).find('a').attr('href');
            chapters.push({ chapterTitle, chapterUrl });
        });

        // Kirim data sebagai response
        res.json({ title, description, chapters });
    } catch (error) {
        console.error('Error scraping data:', error);
        res.status(500).json({ error: 'Failed to scrape data' });
    }
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
