//dynamically create cards
function createCard(tourName, tourDescription, tourId) {
    console.log(tourId);

    let col = document.createElement('div');

    let img = document.createElement('img');
    img.className = 'card-img-top';
    img.setAttribute("id", "image-"+tourId)
    img.setAttribute('style', 'aspect-ratio: 4/3; object-fit: cover; cursor: pointer;')
    //will need to be set to some relevant tree in the theme
    img.setAttribute('src', 'https://previews.123rf.com/images/olegd/olegd1108/olegd110800153/10298561-close-up-of-coconut-palm-tree.jpg');
    img.setAttribute('onclick', 'location.href = "https://www.winona.edu/m/arboretum/directory.asp?t='+tourId+'"');
    
    let card = document.createElement('div');
    card.className = 'card border-secondary shadow-lg';
    card.setAttribute('id', tourId);
    //card.setAttribute('onclick', 'readMore('+tourId+')');

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let title = document.createElement('h4');
    title.className = 'text-center';
    //title.innerText = tourName;
    let titleText = document.createElement('a');
    titleText.setAttribute('href', 'https://www.winona.edu/m/arboretum/directory.asp?t='+tourId);
    titleText.innerText = tourName;
    titleText.className = 'text-body fw-bold';
    title.appendChild(titleText);


    //theme description
    let description = document.createElement('p');
    description.className = '';
    description.setAttribute('id', 'desc'+tourId);
    description.setAttribute('style', 'overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; line-clamp: 1; -webkit-box-orient: vertical;');
    description.innerText = tourDescription;
    /*
    if (tourDescription.length >= 128) {

        card.setAttribute('onclick', 'readMore('+tourId+')');

        var themeDescriptionBeginning = tourDescription.substring(0, 128);
        var themeDescriptionEnd = tourDescription.substring(128);

        description.innerText = themeDescriptionBeginning;

        let cutOff = document.createElement('span');
        cutOff.innerText = '...';
        cutOff.setAttribute('id', 'dots'+tourId);
        description.appendChild(cutOff);

        let more = document.createElement('span');
        more.setAttribute('id', 'more'+tourId);
        more.setAttribute('style', 'display: none;')
        more.innerText = themeDescriptionEnd;
        description.appendChild(more);

    } else {
        description.innerText = tourDescription;
    }
    

    let more = document.createElement('span');
    more.setAttribute('id', 'more');
    more.innerText = themeDescriptionEnd;
    */
    let cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer text-center';
    cardFooter.setAttribute('style', 'background-color: #3B1183;');

    //needs link to theme map
    let map = document.createElement('button');
    map.className = 'btn float-start btn-light';
    map.setAttribute('onclick', 'location.href = "https://www.winona.edu/m/arboretum/thememap.asp?t='+tourId+'"');

    let mapIcon = document.createElement('i');
    mapIcon.className = 'bi-geo-alt-fill';

    
    let changeStateButton = document.createElement('button');
    changeStateButton.className = 'btn float-end btn-light'
    changeStateButton.setAttribute('onclick', 'readMore('+tourId+')');
    
    let stateIcon = document.createElement('i');
    stateIcon.className = 'bi-arrows-expand';
    stateIcon.setAttribute('id', 'icon'+tourId);

    //needs link to theme directory
    //let directory = document.createElement('a');
    //directory.className = 'btn float-end btn-light';
    //directory.setAttribute('href', '');
    //directory.innerText = 'Directory';
    
    

    //build card
    cardBody.appendChild(title);
    cardBody.appendChild(description);
    card.appendChild(img);
    card.appendChild(cardBody);
    map.appendChild(mapIcon);
    cardFooter.appendChild(map);
    changeStateButton.appendChild(stateIcon);
    cardFooter.appendChild(changeStateButton);
    //cardFooter.appendChild(directory);
    card.appendChild(cardFooter);
    col.appendChild(card);
    cardContainer.appendChild(col);
};