// articleLoader.js

document.addEventListener('DOMContentLoaded', () => {
    // Обновление активного класса для навигации
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentPath = window.location.pathname.split('/').pop(); // Получаем имя текущего файла

    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPath = link.getAttribute('href').split('/').pop();

        if (currentPath === linkPath || 
            (currentPath === 'index.html' && linkPath === '') || // Для главной страницы
            (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        } else if (linkPath.includes('articles.html') && window.location.pathname.includes('/articles/')) {
            // Если мы находимся на странице статьи (в подпапке articles), активируем ссылку "Статьи"
            link.classList.add('active');
        } else if (linkPath.includes('about.html') && window.location.pathname.includes('/about/')) {
            // Аналогично для подстраниц "О нас"
            link.classList.add('active');
        }
    });

    // Функция для парсинга Markdown в HTML
    function parseMarkdown(markdown) {
        let html = markdown;

        // Headers
        html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
        html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
        html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

        // Bold & Italic
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Links
        html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

        // Images
        html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');

        // Unordered lists
        html = html.replace(/^\- (.*?)$/gm, '<li>$1</li>');
        const ulMatches = html.match(/(<li>.*?<\/li>(\n<li>.*?<\/li>)*)/gs);
        if (ulMatches) {
            ulMatches.forEach(match => {
                html = html.replace(match, `<ul>\n${match}\n</ul>`);
            });
        }
        html = html.replace(/<\/ul>\n<ul>/g, ''); // Fix nested ul

        // Ordered lists
        html = html.replace(/^\d+\. (.*?)$/gm, '<li>$1</li>');
        const olMatches = html.match(/(<li>.*?<\/li>(\n<li>.*?<\/li>)*)/gs);
        if (olMatches) {
            olMatches.forEach(match => {
                const isOrdered = match.split('\n').every(line => line.match(/^\d+\. /)); // Check if lines originally ordered
                if (isOrdered) {
                    html = html.replace(match, `<ol>\n${match}\n</ol>`);
                }
            });
        }
        html = html.replace(/<\/ol>\n<ol>/g, ''); // Fix nested ol

        // Paragraphs
        const lines = html.split('\n');
        let result = [];
        let inParagraph = false;
        
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();
            if (line === '') {
                if (inParagraph) {
                    result.push('</p>');
                    inParagraph = false;
                }
            } else if (line.startsWith('<h') || line.startsWith('<ul') || line.startsWith('<ol') || line.startsWith('<img')) {
                if (inParagraph) {
                    result.push('</p>');
                    inParagraph = false;
                }
                result.push(line);
            } else {
                if (!inParagraph) {
                    result.push('<p>' + line);
                    inParagraph = true;
                } else {
                    result[result.length - 1] += ' ' + line; // Join lines in same paragraph
                }
            }
        }
        if (inParagraph) {
            result.push('</p>');
        }
        html = result.join('\n');
        
        return html;
    }

    // Функция для рендеринга статьи
    async function renderArticleContent() {
        const articleContentDiv = document.getElementById('article-content');
        if (!articleContentDiv) return; // Если на странице нет div с id="article-content", то это не страница статьи

        const pathSegments = window.location.pathname.split('/');
        // Предполагаем, что имя файла статьи - это последний сегмент перед .html
        const articleFileName = pathSegments[pathSegments.length - 1];
        const articleId = articleFileName.replace('.html', ''); // 'suiters-rf', 'members', 'stickers'

        // Определяем путь к .md файлу
        // Если html файл находится в /articles/suiters-rf.html, то md файл в ../articles/suiters-rf.md
        const markdownPath = `../articles/${articleId}.md`;

        try {
            const response = await fetch(markdownPath);
            if (!response.ok) throw new Error(`Failed to load Markdown: ${response.statusText}`);
            
            const markdown = await response.text();
            const htmlContent = parseMarkdown(markdown);

            const article = document.createElement('div');
            article.className = 'article-page';

            // Карта категорий
            const categoryMap = {
                'stickers': 'Стикеры',
                'suiters-rf': 'Сьютеры',
                'members': 'Участники',
                // Добавьте другие категории по мере необходимости
            };
            const category = categoryMap[articleId] || 'Статья';

            // Находим заголовок H1 из распарсенного HTML
            let articleTitle = 'Без заголовка';
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlContent;
            const h1Element = tempDiv.querySelector('h1');
            if (h1Element) {
                articleTitle = h1Element.textContent;
                h1Element.remove(); // Удаляем h1 из тела, чтобы он был только в article-header
            }

            // Добавляем ссылку "Назад"
            const backLink = document.createElement('a');
            backLink.href = '../articles.html';
            backLink.className = 'back-link';
            backLink.innerHTML = '← Назад к статьям';
            articleContentDiv.before(backLink); // Добавляем перед контейнером статьи

            // Header
            const header = document.createElement('div');
            header.className = 'article-header';
            header.innerHTML = `
                <span class="article-category">${category}</span>
                <h1>${articleTitle}</h1>
            `;

            // Body
            const body = document.createElement('div');
            body.className = 'article-body';
            body.innerHTML = tempDiv.innerHTML; // Используем оставшееся содержимое после удаления h1

            article.appendChild(header);
            article.appendChild(body);

            articleContentDiv.appendChild(article);

            // Устанавливаем заголовок страницы
            document.title = `${articleTitle} - PSA Union`;

        } catch (error) {
            console.error('Error loading or rendering article:', error);
            articleContentDiv.innerHTML = `
                <a href="../articles.html" class="back-link">← Назад к статьям</a>
                <p>Ошибка при загрузке статьи: ${error.message}</p>
            `;
            document.title = `Ошибка - PSA Union`;
        }
    }

    // Запускаем загрузку статьи, если на странице есть элемент #article-content
    if (document.getElementById('article-content')) {
        renderArticleContent();
    }
});