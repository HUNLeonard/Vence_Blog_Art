document.addEventListener("DOMContentLoaded", function() {
    const editorPages = document.querySelector('.editor-pages');
    
    // Load JSON data
    fetch('../data/editors.json')
    .then(response => response.json())
    .then(data => {
        // Populate editor's picks
        data.editors.forEach(editor => {
            const editorPage = createEditorPage(editor);
            editorPages.appendChild(editorPage);
        });

        // Add popular editor's pick
        const popularEditor = data.popular[0];

        document.querySelector('.editor-popular').style.backgroundImage =`url('./assets/editors/${popularEditor.image}')`;
        const popularDetailTime = document.querySelector('.editor-popular-time');
        popularDetailTime.setAttribute('datetime', popularEditor.time);
        popularDetailTime.textContent = popularEditor.time;
        document.querySelector('.editor-popular-title').textContent = popularEditor.title;
        document.querySelector('.editor-popular-desc').textContent = popularEditor.desc;
    })
    .catch(error => console.error('Error fetching data:', error));
});

function createEditorPage(editor){
    const editorPage = document.createElement('div');
    editorPage.classList.add('editor-page');

    const editorPageImage = document.createElement('div');
    editorPageImage.classList.add('editor-page-image');
    editorPageImage.style.backgroundImage = `url('./assets/editors/${editor.image}')`;
    editorPageImage.setAttribute('alt', "Editor's Pick Image");
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