let totalBlogPages = 0;
let totalCreativePages = 0;
let totalLaPages = 0;
let currentBlogPage = 0;
let currentCreativePage = 0;
let currentLaPage = 0;

document.addEventListener("DOMContentLoaded", function() {
    attachPageListeners('.blog-pages a','blog');
    attachPageListeners('.creative-pages a','creative');
    attachPageListeners('#la-pages a','la');
});

function attachPageListeners(selector,type) {
    const observer = new MutationObserver(function(mutationsList) {
        mutationsList.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                const blogPageLinks = document.querySelectorAll(selector);
                if (blogPageLinks.length > 0) {
                    // If the blog page links are found, disconnect the observer
                    observer.disconnect();
                    // Add event listeners to the blog page links
                    blogPageLinks.forEach(function(link) {
                        if (!link.dataset.listener) {
                            link.dataset.listener = true;
                            link.addEventListener('click', function(event) {
                                event.preventDefault();
                                handlePageClick(link, type);
                            });
                        }
                    });
                }
            }
        });
    });
    // Start observing changes to the DOM
    observer.observe(document.body, { childList: true, subtree: true });
}


function handlePageClick(link, type) {

    // If the clicked link is already the current page, do nothing
    if (link.classList.contains('current')) {
        return;
    }

    // Remove the 'current' class from all page links of the same type
    const linksSelector = type === 'blog' ? '.blog-pages a' : type === 'creative'? '.creative-pages a' : '#la-pages a';
    document.querySelectorAll(linksSelector).forEach(function(page) {
        page.classList.remove('current');
    });

    // Add the 'current' class to the clicked link
    link.classList.add('current');

    // Load the corresponding post based on type
    if (type === 'blog') {
        currentBlogPage = parseInt(link.innerText);
        loadBlogPost(currentBlogPage - 1); // Adjust index since pages start from 1 but array indices start from 0
    } else if (type === 'creative') {
        currentCreativePage = parseInt(link.innerText);
        loadCreativePost(currentCreativePage - 1);
    }else if (type === 'la') {
        const pageNumber = link.textContent;
        if (pageNumber === 'Prev Page') {
            currentLaPage--;
        }
        else if (pageNumber === 'Next Page') {
            currentLaPage++;
        } else {
            currentLaPage = parseInt(pageNumber) - 1;
        }
        loadLaPost(currentLaPage);
    }
}

function updatePageNumbers(currentPage, totalPages, type) {
    // Update page numbers
    if (type === 'blog') {
        pagesContainer = document.querySelector('.blog-pages');
        totalBlogPages = totalPages;
    } else if (type === 'creative') {
        pagesContainer = document.querySelector('.creative-pages');
        totalCreativePages = totalPages;
    }else if (type === 'la') {
        pagesContainer = document.querySelector('#la-pages');
        totalLaPages = totalPages;
    }
    pagesContainer.innerHTML = ''; // Clear existing page numbers

    let startPage = currentPage - 1;
    let endPage = currentPage + 1;

    if (startPage < 1) {
        startPage = 1;
        endPage = Math.min(totalPages, startPage + 2);
    }

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - 2);
    }

    if (type === 'la') {
        // Add "Prev Page" link if there are more pages
        if (currentPage > 1) {
            const prevPageLink = document.createElement('a');
            prevPageLink.href = '#';
            prevPageLink.textContent = 'Prev Page';
            pagesContainer.appendChild(prevPageLink);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pagesContainer.innerHTML += `<a href="#"${i === currentPage ? ' class="current"' : ''}>${i < 10 ? '0' + i : i}</a>`;
    }

    if (type === 'la') {
        // Add "Next Page" link if there are more pages
        if (currentPage < totalPages) {
            const nextPageLink = document.createElement('a');
            nextPageLink.href = '#';
            nextPageLink.textContent = 'Next Page';
            pagesContainer.appendChild(nextPageLink);
        }
    }

    // Reattach event listeners to the blog page links
    const pageLinks = document.querySelectorAll('.blog-pages a, .creative-pages a, #la-pages a');
    pageLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            if (link.closest('.blog-pages')) {
                handlePageClick(link, 'blog');
            } else if (link.closest('.creative-pages')) {
                handlePageClick(link, 'creative');
            }else if (link.closest('#la-pages')) {
                handlePageClick(link, 'la');
            }
        });
    });
    
    if (type === 'la'){
        const screenHeight = window.innerHeight;
        const yOffset = -Math.floor(0.8 * screenHeight);
        const y = pagesContainer.getBoundingClientRect().bottom + window.scrollY + yOffset;

        window.scrollTo({top: y, behavior: 'smooth'});
    }
}



function loadBlogPost(pageIndex) {
    fetch('../data/blogs.json')
        .then(response => response.json())
        .then(data => {
            const blog = data.blogs[pageIndex];
            totalBlogPages = data.blogs.length;

            document.querySelector('.blog-image').style.backgroundImage = `url('./assets/blogs/${blog.image}')`;
            document.querySelector('.blog-time').textContent = blog.time;
            document.querySelector('.blog-time').setAttribute('datetime', blog.time);
            document.querySelector('.blog-title').textContent = blog["blog-title"];
            document.querySelector('.blog-desc').textContent = blog["blog-desc"];
            document.querySelector('.blog-auth').textContent = blog["blog-auth"] ? `By: ${blog["blog-auth"]}` : '';

            updatePageNumbers(currentBlogPage, totalBlogPages, 'blog');
        })
        .catch(error => console.error('Error fetching data:', error));
}


function loadCreativePost(pageIndex) {
    fetch('../data/creatives.json')
        .then(response => response.json())
        .then(data => {
            const creative = data.creatives[pageIndex];
            totalCreativePages = data.creatives.length;

            document.getElementById('creative').style.backgroundImage = `url('./assets/creatives/${creative.image}')`;
            document.querySelector('.creative-time').textContent = creative.time;
            document.querySelector('.creative-time').setAttribute('datetime', creative.time);
            document.querySelector('.creative-title').textContent = creative.title;

            updatePageNumbers(currentCreativePage, totalCreativePages, 'creative');
        })
        .catch(error => console.error('Error fetching data:', error));
}



function loadLaPost(pageIndex) {
    fetch('../data/larticles.json')
        .then(response => response.json())
        .then(data => {
            const startIndex = pageIndex * 8;
            const endIndex = startIndex + 8;
            const articlesData = data.articles.slice(startIndex, endIndex);

            const articleElements = document.querySelectorAll('.article');
        
            articleElements.forEach((currentArticle, index) => {
                if (index >= articlesData.length) {
                    

                    currentArticle.querySelector('.article-image').style.backgroundImage = "";
                    currentArticle.querySelector('.article-time').setAttribute('datetime', '');
                    currentArticle.querySelector('.article-time').textContent = '';
                    currentArticle.querySelector('.article-title').textContent = '';
                    currentArticle.querySelector('.article-desc').textContent = '';
                } else {


                    currentArticle.querySelector('.article-image').style.backgroundImage = `url('./assets/articles/${articlesData[index].image}')`;
                    currentArticle.querySelector('.article-time').setAttribute('datetime', articlesData[index].time);
                    currentArticle.querySelector('.article-time').textContent = articlesData[index].time;
                    currentArticle.querySelector('.article-title').textContent = articlesData[index].title;
                    currentArticle.querySelector('.article-desc').textContent = articlesData[index].desc;
                }
            });

            totalPages = Math.ceil(data.articles.length / 8);
            updatePageNumbers(currentLaPage + 1, totalPages, 'la');
        })
        .catch(error => console.error('Error fetching data:', error));
}
