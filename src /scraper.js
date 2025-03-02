const axios = require('axios');
const cheerio = require('cheerio');

// Fungsi untuk scraping data novel berdasarkan URL
const scrapeNovelData = async (url) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        let title, description, chapters;

        // Deteksi situs dan sesuaikan logika scraping
        if (url.includes('sakuranovel.id')) {
            // Logika scraping untuk sakuranovel.id
            title = $('h1.novel-title').text().trim();
            description = $('div.novel-description').text().trim();
            chapters = [];
            $('ul.chapter-list li').each((index, element) => {
                const chapterTitle = $(element).find('a').text().trim();
                const chapterUrl = $(element).find('a').attr('href');
                chapters.push({ chapterTitle, chapterUrl });
            });
        } else if (url.includes('novelnookhaven.blogspot.com')) {
            // Logika scraping untuk novelnookhaven.blogspot.com
            title = $('h1.post-title').text().trim();
            description = $('div.post-body').text().trim();
            chapters = [];
            $('div.post-body a').each((index, element) => {
                const chapterTitle = $(element).text().trim();
                const chapterUrl = $(element).attr('href');
                if (chapterTitle && chapterUrl) {
                    chapters.push({ chapterTitle, chapterUrl });
                }
            });
        } else if (url.includes('pannovel.online')) {
            // Logika scraping untuk pannovel.online
            title = $('h1.entry-title').text().trim();
            description = $('div.entry-content').text().trim();
            chapters = [];
            $('div.entry-content a').each((index, element) => {
                const chapterTitle = $(element).text().trim();
                const chapterUrl = $(element).attr('href');
                if (chapterTitle && chapterUrl) {
                    chapters.push({ chapterTitle, chapterUrl });
                }
            });
        } else {
            throw new Error('Unsupported website');
        }

        return { url, title, description, chapters };
    } catch (error) {
        console.error('Error scraping data:', error);
        return null;
    }
};

module.exports = scrapeNovelData;
