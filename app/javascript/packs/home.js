let searchButton = document.getElementById('searchMovieButton');
searchButton.onclick = () => {
    searchMovie();
};

let nominations = localStorage.getItem('nominations')
let nominationList = (nominations) ? nominations.split(',') : [];
updateNomination();
let searchList = [];

function searchMovie() {
    let title = document.getElementById('searchMovieText').value;

    if (title === '') {
        showErrorMessage('There is nothing to search');
        return;
    }

    let oReq = new XMLHttpRequest();

    oReq.onload = function() {
        if (oReq.status != 200) { // analyze HTTP status of the response
            alert(`Error ${oReq.status}: ${oReq.statusText}`); // e.g. 404: Not Found
        } else { // show the result
            let response = oReq.response;
            changeSearch(response);
        }
    }

    oReq.open('GET', window.location.href + 'search?title='+title);
    oReq.send();
}

function changeSearch(movies) {
    let listSection = document.getElementById('searchSection');
    let searchResult = document.getElementById('searchResult');
    searchResult.innerHTML = 'Results for "' + document.getElementById('searchMovieText').value + '"';
    listSection.style.visibility = 'visible';
    
    searchList = JSON.parse(movies);
    updateSearch();
}

function nominateMovie(name) {
    if (nominationList.length > 4) {
        showErrorMessage('Nomination list exceeds five movies');
        return;
    }
    if (checkNomination(name)) { return; }
    nominationList.push(name);
    updateSearch();
    updateNomination();
    storeToLocalStorage();
}

function unnominateMovie(name){
    if (!checkNomination(name)) { return; }
    nominationList = nominationList.filter(function(item) {
        return item !== name
    });
    updateSearch();
    updateNomination();
    storeToLocalStorage();
}

function updateSearch() {
    let movies = searchList;
    let searchListSection = document.getElementById('searchList');
    searchListSection.innerHTML = '';
    let movieList = movies.Search;
    for (let i in movieList) {
        let movie = document.createElement('li');
        movie.className = 'flex py-1 font-normal text-xl content-center';

        let text = document.createElement('p');
        text.textContent = movieList[i].Title + ' (' + movieList[i].Year + ')';
        text.className = 'px-2';
        
        let nominateButtonIcon = document.createElement('i');
        if (checkNomination(text.textContent)) {
            nominateButtonIcon.className = 'far fa-plus-square pt-1 text-green-200 inactive'
        } else {
            nominateButtonIcon.className = 'far fa-plus-square pt-1 text-green-400 hover:text-green-600'
            nominateButtonIcon.onclick = () => {
                nominateMovie(text.textContent);
            };
        }
        
        movie.appendChild(nominateButtonIcon);
        movie.appendChild(text);
        searchListSection.appendChild(movie);
    }
}

function updateNomination() {
    let nominationListSection = document.getElementById('nominationList');
    nominationListSection.innerHTML = '';
    for (let i in nominationList) {
        let movie = document.createElement('li');
        movie.className = 'flex py-1 font-normal text-xl content-center';

        let text = document.createElement('p');
        text.textContent = nominationList[i];
        text.className = 'px-2';

        let unnominateButtonIcon = document.createElement('i')
        unnominateButtonIcon.className = 'far fa-minus-square pt-1 text-green-400 content-center hover:text-green-600'
        unnominateButtonIcon.onclick = () => {
            unnominateMovie(text.textContent);
        };

        movie.appendChild(unnominateButtonIcon);
        movie.appendChild(text);
        nominationListSection.appendChild(movie);
    }
}

function checkNomination(movie) {
    for (let i in nominationList) {
        if (nominationList[i] === movie) {
            return true;
        }
    }
    return false;
}

function showErrorMessage(error) {
    let errorDiv = document.getElementById('error');
    errorDiv.innerHTML = '';
    errorDiv.className = 'flex border border-red-400 rounded-xl justify-center bg-white';

    let exitButtonIcon = document.createElement('i')
    exitButtonIcon.className = 'far fa-times-circle pt-1 text-red-500 content-center hover:text-red-600 pl-2'
    exitButtonIcon.onclick = () => {
        clearError();
    };
        
    let errorText = document.createElement('p');
    errorText.textContent = error;
    errorText.className = 'px-2 text-red-500 text-md font-semibold';

    errorDiv.appendChild(exitButtonIcon);
    errorDiv.appendChild(errorText);
}

function storeToLocalStorage() {
    localStorage.setItem('nominations', nominationList.toString());
}

function clearError(){
    let errorDiv = document.getElementById('error');
    errorDiv.innerHTML = '';
}