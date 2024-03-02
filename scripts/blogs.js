document.addEventListener("DOMContentLoaded", function() {

    const blogContainer = document.getElementById('blog');
    let currentPage = 0;
    
    // Function to load blog data based on page number
    function loadBlogData(page) {
        fetch('../data/blogs.json')
        .then(response => response.json())
        .then(data => {
            const blog = data.blogs[page];
            if (blog) {
                const blogImage = document.createElement('div');
                blogImage.classList.add('blog-image');
                blogImage.style.backgroundImage = `url('./assets/blogs/${blog.image}')`;

                const blogInfos = document.createElement('section');
                blogInfos.classList.add('blog-infos');

                const blogPages = document.createElement('nav');
                blogPages.classList.add('blog-pages');
                for (let i = 0; i < 3; i++) {
                    const blogPage = document.createElement('a');
                    blogPage.href = '#';
                    const pageNumber = (i < 9 ? '0' : '') + (i + 1);
                    blogPage.textContent = pageNumber;
                    if (i === page) {
                        blogPage.classList.add('current');
                    }
                    blogPages.appendChild(blogPage);
                }
                const blogSquare = document.createElement('div');
                blogSquare.classList.add('blog-square');

                const blogDetails = document.createElement('div');
                blogDetails.classList.add('blog-details');

                const blogTime = document.createElement('time');
                blogTime.setAttribute('datetime', blog.time);
                blogTime.classList.add('blog-time');
                blogTime.textContent = blog.time;

                const blogTitle = document.createElement('h2');
                blogTitle.classList.add('blog-title');
                blogTitle.textContent = blog['blog-title'];

                const blogDesc = document.createElement('p');
                blogDesc.classList.add('blog-desc');
                blogDesc.textContent = blog['blog-desc'];

                const blogAuth = document.createElement('div');
                blogAuth.classList.add('blog-auth');
                blogAuth.textContent = blog["blog-auth"] ? `By: ${blog["blog-auth"]}` : '';

                blogDetails.appendChild(blogTime);
                blogDetails.appendChild(blogTitle);
                blogDetails.appendChild(blogDesc);
                blogDetails.appendChild(document.createElement('hr'));
                blogDetails.appendChild(blogAuth);

                blogSquare.appendChild(blogDetails);

                blogInfos.appendChild(blogPages);

                blogContainer.innerHTML = '';
                blogContainer.appendChild(blogImage);
                blogInfos.appendChild(blogSquare);
                blogContainer.appendChild(blogInfos);
            }
        })
        .catch(error => console.error('Error fetching blog data:', error));
    }
    // Load initial blog data
    loadBlogData(currentPage);
});

