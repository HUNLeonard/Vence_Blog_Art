document.addEventListener("DOMContentLoaded", function() {
    let currentPage = 0;
    let imageLoaded = false;

    // Function to load blog data based on page number
    function loadBlogData(page) {
        fetch('../data/blogs.json')
            .then(response => response.json())
            .then(data => {
                const blog = data.blogs[page];
                if (blog) {
                    document.querySelector('.blog-time').textContent = blog.time;
                    document.querySelector('.blog-time').setAttribute('datetime', blog.time);
                    document.querySelector('.blog-title').textContent = blog['blog-title'];
                    document.querySelector('.blog-desc').textContent = blog['blog-desc'];
                    document.querySelector('.blog-auth').textContent = blog["blog-auth"] ? `By: ${blog["blog-auth"]}` : '';

                    const pageLinks = document.querySelectorAll('.blog-pages a');
                    pageLinks.forEach((link, i) => {
                        const pageNumber = (i < 9 ? '0' : '') + (i + 1);
                        link.textContent = pageNumber;
                        if (i === page) {
                            link.classList.add('current');
                        } else {
                            link.classList.remove('current');
                        }
                    });
                    // Load blog image after loading blog data
                    loadBlogImage(page);
                }
            })
            .catch(error => console.error('Error fetching blog data:', error));
    }

    // Load initial blog data
    loadBlogData(currentPage);

    async function fetchPhotoById(photoId) {
        const response = await fetch(`https://api.slingacademy.com/v1/sample-data/photos/${photoId}`);
        const data = await response.json();
        return data.photo; // Photo object
    }

    async function loadBlogImage(page) {
        try {
            const photo = await fetchPhotoById(Number(page)+18);

            document.querySelector('.blog-image').style.backgroundImage = `url('${photo.url}')`;
        } catch (error) {
            console.error('Error fetching photo:', error);
        }
    }
});
