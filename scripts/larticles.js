document.addEventListener("DOMContentLoaded", function() {
    let currentPage = 0;
    let totalPages = 0;
    let initialLoad = true;

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

                articlesData.forEach(article => {
                    const articleDiv = document.createElement('div');
                    articleDiv.classList.add('article');

                    const articleImage = document.createElement('div');
                    articleImage.classList.add('article-image');
                    articleImage.style.backgroundImage = `url('./assets/articles/${article.image}')`;
                    articleImage.style.height = article.height;
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
                initialLoad = false;
            })
            .catch(error => console.error('Error fetching data:', error));
    }
    loadArticles(currentPage);

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

        // Add event listener to pagination links
        laPagesContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                handlePageClick(link);
            });
        });

        // Scroll to the bottom of the page only after the initial load
        if (!initialLoad) {
            const screenHeight = window.innerHeight;
            const yOffset = -Math.floor(0.8 * screenHeight);
            const y = laPagesContainer.getBoundingClientRect().bottom + window.scrollY + yOffset;

            window.scrollTo({top: y, behavior: 'smooth'});
        }
    }

    // Function to handle pagination link click
    function handlePageClick(link) {
        const pageNumber = link.textContent;
        if (pageNumber === 'Prev Page') {
            currentPage--;
        }
        else if (pageNumber === 'Next Page') {
            currentPage++;
        } else {
            currentPage = parseInt(pageNumber) - 1;
        }
        
        loadArticles(currentPage);
    }
});
