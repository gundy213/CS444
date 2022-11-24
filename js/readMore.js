function readMore(cardId) {

    var icon = document.getElementById('icon'+cardId);
    var description = document.getElementById('desc'+cardId);

    var container = document.querySelector('#cardContainer');
    var msnry = new Masonry( container, {
        percentPosition: 'True',
        horizontalOrder: 'True',
        transitionDuration: '0.2s'
    });
    
    if(description.style.overflow === 'hidden'){
        description.style = '';
        icon.className = 'bi-arrows-collapse';
        msnry.layout();  
    } else {
        description.style = 'overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; line-clamp: 1; -webkit-box-orient: vertical;';
        icon.className = 'bi-arrows-expand';
        msnry.layout();   
    }
};