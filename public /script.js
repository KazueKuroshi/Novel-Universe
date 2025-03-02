document.addEventListener('DOMContentLoaded', function () {
    const novelForm = document.getElementById('novel-form');
    const novelDataSection = document.getElementById('novel-data');

    novelForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const novelUrl = document.getElementById('novel-url').value;

        if (novelUrl) {
            try {
                const response = await fetch(`/api/novel?url=${encodeURIComponent(novelUrl)}`);
                const data = await response.json();

                if (data.error) {
                    novelDataSection.innerHTML = `<p>Error: ${data.error}</p>`;
                } else {
                    novelDataSection.innerHTML = `
                        <div class="novel-info">
                            <h2>${data.title}</h2>
                            <p>${data.description}</p>
                        </div>
                        <ul class="chapter-list">
                            ${data.chapters.map(chapter => `
                                <li><a href="${chapter.chapterUrl}" target="_blank">${chapter.chapterTitle}</a></li>
                            `).join('')}
                        </ul>
                    `;
                }
            } catch (error) {
                novelDataSection.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
            }
        } else {
            novelDataSection.innerHTML = '<p>Please enter a valid URL.</p>';
        }
    });
});
