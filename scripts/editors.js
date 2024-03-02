document.addEventListener("DOMContentLoaded", function() {
    const editorContent = document.getElementById('editor-content');
    
    // Load JSON data
    fetch('../data/editors.json')
    .then(response => response.json())
    .then(data => {
        // Populate editor's picks
        const editorPages = document.createElement('div');
        editorPages.classList.add('editor-pages');

        data.editors.forEach(editor => {
            const editorPage = createEditorPage(editor);
            editorPages.appendChild(editorPage);
        });
        editorContent.appendChild(editorPages);

        // Add popular editor's pick
        const popularEditor = data.popular[0]; // Assuming 'popular' contains the popular editor's data
        const editorPopular = document.createElement('div');
        editorPopular.classList.add('editor-popular');
        editorPopular.style.backgroundImage =`url('./assets/editors/${popularEditor.image}')`;

        const editorPopularDetails = document.createElement('div');
        editorPopularDetails.classList.add('editor-popular-details');

        const popularDetailTime = document.createElement('time');
        popularDetailTime.classList.add('editor-popular-time');
        popularDetailTime.setAttribute('datetime', popularEditor.time);
        popularDetailTime.textContent = popularEditor.time;
        editorPopularDetails.appendChild(popularDetailTime);

        const popularDetailTitle = document.createElement('h3');
        popularDetailTitle.classList.add('editor-popular-title');
        popularDetailTitle.textContent = popularEditor.title;
        editorPopularDetails.appendChild(popularDetailTitle);

        const popularDetailDesc = document.createElement('p');
        popularDetailDesc.classList.add('editor-popular-desc');
        popularDetailDesc.textContent = popularEditor.desc;
        editorPopularDetails.appendChild(popularDetailDesc);

        editorPopular.appendChild(editorPopularDetails);

        editorContent.appendChild(editorPopular);
    })
    .catch(error => console.error('Error fetching data:', error));
});

function createEditorPage(editor){
    const editorPage = document.createElement('div');
    editorPage.classList.add('editor-page');

    const editorPageImage = document.createElement('div');
    editorPageImage.classList.add('editor-page-image');
    editorPageImage.style.backgroundImage = `url('./assets/editors/${editor.image}')`;
    editorPage.appendChild(editorPageImage);

    const editorPageDetails = document.createElement('div');
    editorPageDetails.classList.add('editor-page-details');

    const pageDetailTime = document.createElement('time');
    pageDetailTime.classList.add('page-detail-time');
    pageDetailTime.setAttribute('datetime', editor.time);
    pageDetailTime.textContent = editor.time;
    editorPageDetails.appendChild(pageDetailTime);

    const pageDetailTitle = document.createElement('h3');
    pageDetailTitle.classList.add('page-detail-title');
    pageDetailTitle.setAttribute('datetime', editor.time);
    pageDetailTitle.textContent = editor.title;
    editorPageDetails.appendChild(pageDetailTitle);

    const pageDetailDesc = document.createElement('p');
    pageDetailDesc.classList.add('page-detail-desc');
    pageDetailDesc.textContent = editor.desc;
    editorPageDetails.appendChild(pageDetailDesc);

    const pageDetailAuth = document.createElement('p');
    pageDetailAuth.classList.add('page-detail-auth');
    pageDetailAuth.textContent = editor.auth ? `By: ${editor.auth}` : '';
    editorPageDetails.appendChild(pageDetailAuth);

    editorPage.appendChild(editorPageDetails);

    return editorPage;
}

