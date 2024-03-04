// Define a function to observe the hidden elements
function observeHiddenElements() {
    const hiddenElements = document.querySelectorAll('.popup');
    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('shown');
                entry.target.classList.remove('popup');
                observer.unobserve(entry.target); 
            }
        });
    });
    hiddenElements.forEach((el) => observer.observe(el));
}

// Define a function to handle the mutation
function handleMutation(mutationsList) {
    mutationsList.forEach((mutation) => {
        if (mutation.type === 'childList') {
            // Check if the "articles" container or its descendants are added
            const articlesContainer = document.getElementById('larticles');
            if (articlesContainer && articlesContainer.contains(mutation.target)) {
                // Start observing hidden elements once the "articles" content is loaded
                observeHiddenElements();
            }
        }
    });
}

// Create a MutationObserver instance
const observer = new MutationObserver(handleMutation);

// Start observing changes to the DOM
observer.observe(document.body, { childList: true, subtree: true });