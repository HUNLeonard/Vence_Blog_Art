document.addEventListener("DOMContentLoaded", function() {
    let currentPage = 0;
    let totalPages = 0;

    // Function to load articles based on page number
    function loadArticles(page) {
        fetch('../data/larticles.json')
            .then(response => response.json())
            .then(data => {
                const startIndex = page * 8;
                const endIndex = startIndex + 8;
                const articlesData = data.articles.slice(startIndex, endIndex);

                const articlesContainer = document.getElementById('larticles');
                articlesContainer.innerHTML = ''; // Clear existing articles

                articlesData.forEach((article, index) => {
                    const articleDiv = document.createElement('section');
                    articleDiv.classList.add('article');

                    const articleImage = document.createElement('div');
                    articleImage.classList.add('article-image');
                    articleImage.style.backgroundImage = `url('./assets/articles/${article.image}')`;
                    articleImage.style.height = getImageHeight(index);
                    articleDiv.appendChild(articleImage);

                    const articleDetails = document.createElement('div');
                    articleDetails.classList.add('article-details');

                    const articleTime = document.createElement('time');
                    articleTime.classList.add('article-time');
                    articleTime.setAttribute('datetime', article.time);
                    articleTime.textContent = article.time;
                    articleDetails.appendChild(articleTime);

                    const articleTitle = document.createElement('h3');
                    articleTitle.classList.add('article-title');
                    articleTitle.textContent = article.title;
                    articleDetails.appendChild(articleTitle);

                    const articleDesc = document.createElement('p');
                    articleDesc.classList.add('article-desc');
                    articleDesc.textContent = article.desc;
                    articleDetails.appendChild(articleDesc);
                    
                    articleDiv.appendChild(articleDetails);
                    articlesContainer.appendChild(articleDiv);
                });
                totalPages = Math.ceil(data.articles.length / 8);
                updatePageNumbers(currentPage + 1, totalPages);
            })
            .catch(error => console.error('Error fetching data:', error));
    }
    loadArticles(currentPage);

    function getImageHeight(index) {
        switch (index % 8) {
            case 0:
            case 6:
            case 7:
                return '200px';
            case 1:
            case 3:
            case 4:
                return '370px';
            case 2:
            case 5:
                return '287px';
            default:
                return 'auto';
        }
    }


    // Function to update pagination links
    function updatePageNumbers(currentPage, totalPages) {
        const laPagesContainer = document.getElementById('la-pages');
        laPagesContainer.innerHTML = ''; // Clear existing pagination links

        // Calculate start and end page numbers to display
        let startPage = currentPage - 1;
        let endPage = currentPage + 1;

        // Adjust start and end page numbers if they exceed the total pages range
        if (startPage < 1) {
            startPage = 1;
            endPage = Math.min(totalPages, startPage + 2);
        }
    
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - 2);
        }

        // Add "Prev Page" link if there are more pages
        if (currentPage > 1) {
            const prevPageLink = document.createElement('a');
            prevPageLink.href = '#';
            prevPageLink.textContent = 'Prev Page';
            laPagesContainer.appendChild(prevPageLink);
        }

        // Add pagination links based on calculated range
        for (let i = startPage; i <= endPage; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.textContent = i < 10 ? '0' + i : i;
            if (i === currentPage) {
                pageLink.classList.add('current');
            }
            laPagesContainer.appendChild(pageLink);
        }

        // Add "Next Page" link if there are more pages
        if (currentPage < totalPages) {
            const nextPageLink = document.createElement('a');
            nextPageLink.href = '#';
            nextPageLink.textContent = 'Next Page';
            laPagesContainer.appendChild(nextPageLink);
        }
    }
});
