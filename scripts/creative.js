document.addEventListener("DOMContentLoaded", function() {
    let currentPage = 0;
    let imageLoaded = false;

    // Function to load creative data based on page number
    function loadCreativeData(page) {
        fetch('../data/creatives.json')
            .then(response => response.json())
            .then(data => {
                const creative = data.creatives[page];
                if (creative) {
                    const image = new Image();
                    image.onload = function() {
                        // Apply transition only if the image has been previously loaded
                        if (imageLoaded) {
                            document.querySelector('#creative').classList.add('fade');
                            setTimeout(() => {
                                document.querySelector('#creative').style.backgroundImage = `url('./assets/creatives/${creative.image}')`;
                                document.querySelector('#creative').classList.remove('fade');
                            }, 500);
                        } else {
                            document.querySelector('#creative').style.backgroundImage = `url('./assets/creatives/${creative.image}')`;
                            imageLoaded = true;
                        }
                    };
                    image.src = `./assets/creatives/${creative.image}`;

                    document.querySelector('.creative-time').textContent = creative.time;
                    document.querySelector('.creative-time').setAttribute('datetime', creative.time);
                    document.querySelector('.creative-title').textContent = creative.title;
                    
                    const creativePages = document.querySelectorAll('.creative-pages a');
                    creativePages.forEach((link, i) => {
                        const pageNumber = (i < 9 ? '0' : '') + (i + 1);
                        link.textContent = pageNumber;
                        if (i === page) {
                            link.classList.add('current');
                        } else {
                            link.classList.remove('current');
                        }
                    });
                }
            })
            .catch(error => console.error('Error fetching creative data:', error));
    }

    // Load initial creative data
    loadCreativeData(currentPage);
});
