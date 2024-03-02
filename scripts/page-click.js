let totalBlogPages = 0;
let totalCreativePages = 0;
let currentBlogPage = 0;
let currentCreativePage = 0;

document.addEventListener("DOMContentLoaded", function() {
    attachBlogPageListeners();
    attachCreativePageListeners();
});

function attachBlogPageListeners() {
    const observer = new MutationObserver(function(mutationsList) {
        mutationsList.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                const blogPageLinks = document.querySelectorAll('.blog-pages a');
                if (blogPageLinks.length > 0) {
                    // If the blog page links are found, disconnect the observer
                    observer.disconnect();
                    // Add event listeners to the blog page links
                    blogPageLinks.forEach(function(link) {
                        if (!link.dataset.listener) {
                            link.dataset.listener = true;
                            link.addEventListener('click', function(event) {
                                event.preventDefault();
                                handlePageClick(link, 'blog');
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

function attachCreativePageListeners() {
    const observer = new MutationObserver(function(mutationsList) {
        mutationsList.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                const creativePageLinks = document.querySelectorAll('.creative-pages a');
                if (creativePageLinks.length > 0) {
                    // If the creative page links are found, disconnect the observer
                    observer.disconnect();
                    // Add event listeners to the creative page links
                    creativePageLinks.forEach(function(link) {
                        if (!link.dataset.listener) {
                            link.dataset.listener = true;
                            link.addEventListener('click', function(event) {
                                event.preventDefault();
                                handlePageClick(link, 'creative');
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
    const linksSelector = type === 'blog' ? '.blog-pages a' : '.creative-pages a';
    document.querySelectorAll(linksSelector).forEach(function(page) {
        page.classList.remove('current');
    });

    // Add the 'current' class to the clicked link
    link.classList.add('current');

    // Load the corresponding post based on type
    const pageNumber = parseInt(link.innerText); // Parse the page number as an integer
    if (type === 'blog') {
        currentBlogPage = pageNumber;
        loadBlogPost(currentBlogPage - 1); // Adjust index since pages start from 1 but array indices start from 0
    } else if (type === 'creative') {
        currentCreativePage = pageNumber;
        loadCreativePost(currentCreativePage - 1);
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

    for (let i = startPage; i <= endPage; i++) {
        pagesContainer.innerHTML += `<a href="#"${i === currentPage ? ' class="current"' : ''}>${i < 10 ? '0' + i : i}</a>`;
    }

    // Reattach event listeners to the blog page links
    const pageLinks = document.querySelectorAll('.blog-pages a, .creative-pages a');
    pageLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            if (link.closest('.blog-pages')) {
                handlePageClick(link, 'blog');
            } else if (link.closest('.creative-pages')) {
                handlePageClick(link, 'creative');
            }
        });
    });
}


function loadBlogPost(pageIndex) {
    fetch('../data/blogs.json')
        .then(response => response.json())
        .then(data => {
            const blogs = data.blogs;
            const blog = blogs[pageIndex];
            totalBlogPages = data.blogs.length;
            // Update the DOM with the data from the selected blog
            const blogImage = document.querySelector('.blog-image');
            blogImage.style.backgroundImage = `url('./assets/blogs/${blog.image}')`;

            const blogTime = document.querySelector('.blog-time');
            blogTime.textContent = blog.time;

            const blogTitle = document.querySelector('.blog-title');
            blogTitle.textContent = blog["blog-title"];

            const blogDesc = document.querySelector('.blog-desc');
            blogDesc.textContent = blog["blog-desc"];

            const blogAuth = document.querySelector('.blog-auth');
            blogAuth.textContent = blog["blog-auth"] ? `By: ${blog["blog-auth"]}` : '';

            // Update page numbers after loading blog post
            updatePageNumbers(currentBlogPage, totalBlogPages, 'blog');
        })
        .catch(error => console.error('Error fetching data:', error));

    
}


function loadCreativePost(pageIndex) {
    fetch('../data/creatives.json')
        .then(response => response.json())
        .then(data => {
            const creatives = data.creatives;
            const creative = creatives[pageIndex];
            totalCreativePages = data.creatives.length;
            // Update the DOM with the data from the selected creative
            const creativeContents = document.getElementById('creative');
            creativeContents.style.backgroundImage = `url('./assets/creatives/${creative.image}')`;

            const creativeTime = document.querySelector('.creative-time');
            creativeTime.textContent = creative.time;

            const creativeTitle = document.querySelector('.creative-title');
            creativeTitle.textContent = creative.title;

            // Update page numbers after loading creative post
            updatePageNumbers(currentCreativePage, totalCreativePages, 'creative');
        })
        .catch(error => console.error('Error fetching data:', error));
}

