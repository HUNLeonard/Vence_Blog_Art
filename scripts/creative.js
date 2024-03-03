document.addEventListener("DOMContentLoaded", function() {
    let currentPage = 0;

    // Function to load creative data based on page number
    function loadCreativeData(page) {
        fetch('../data/creatives.json')
            .then(response => response.json())
            .then(data => {
                const creative = data.creatives[page];
                if (creative) {
                    document.querySelector('#creative').style.backgroundImage = `url('./assets/creatives/${creative.image}')`;
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
