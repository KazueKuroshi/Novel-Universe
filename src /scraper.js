const axios = require('axios');
     const cheerio = require('cheerio');

     const scrapeNovelData = async (url) => {
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

             return {
                 title,
                 description,
                 chapters,
             };
         } catch (error) {
             console.error('Error scraping data:', error);
             return null;
         }
     };

     // Contoh penggunaan
     (async () => {
         const url = 'https://sakuranovel.id/novel/some-novel-title';
         const novelData = await scrapeNovelData(url);
         console.log(novelData);
     })();
