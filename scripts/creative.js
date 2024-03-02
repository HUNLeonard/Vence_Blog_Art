document.addEventListener("DOMContentLoaded", function() {
    const creativeArticle = document.getElementById('creative');

    const creativeContainer = document.createElement('div');
    creativeContainer.classList.add('creative-contents');

    let currentPage = 0;
    
    // Function to load creative data based on page number
    function loadCreativeData(page) {
        fetch('../data/creatives.json')
        .then(response => response.json())
        .then(data => {
            const creative = data.creatives[page];
            if (creative) {
                creativeArticle.style.backgroundImage = `url('./assets/creatives/${creative.image}')`;

                const creativeDetails = document.createElement('div');
                creativeDetails.classList.add('creative-details');

                const timeElement = document.createElement('time');
                timeElement.classList.add('creative-time');
                timeElement.setAttribute('datetime', creative.time);
                timeElement.textContent = creative.time;


                const creativeTitle = document.createElement('div');
                creativeTitle.classList.add('creative-title');
                creativeTitle.textContent = creative.title;

                creativeDetails.appendChild(timeElement);
                creativeDetails.appendChild(creativeTitle);

                const creativePages = document.createElement('nav');
                creativePages.classList.add('creative-pages');
                for (let i = 0; i < 3; i++) {
                    const creativePage = document.createElement('a');
                    creativePage.href = '#';
                    const pageNumber = (i < 9 ? '0' : '') + (i + 1);
                    creativePage.textContent = pageNumber;
                    if (i === page) {
                        creativePage.classList.add('current');
                    }
                    creativePages.appendChild(creativePage);
                }

                creativeContainer.appendChild(creativeDetails);
                creativeContainer.appendChild(creativePages);

                creativeArticle.appendChild(creativeContainer);
            }
        })
        .catch(error => console.error('Error fetching creative data:', error));
    }
    
    // Load initial creative data
    loadCreativeData(currentPage);
});
