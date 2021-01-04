let searchButton = document.getElementById("searchMovieButton");
searchButton.onclick = () => {
    searchMovie();
};

nominationList = [];
searchList = [];

function searchMovie() {
    let title = document.getElementById("searchMovieText").value
    let oReq = new XMLHttpRequest();

    oReq.onload = function() {
        if (oReq.status != 200) { // analyze HTTP status of the response
            alert(`Error ${oReq.status}: ${oReq.statusText}`); // e.g. 404: Not Found
        } else { // show the result
            let response = oReq.response;
            changeSearch(response)
        }
    }

    oReq.open("GET", window.location.href + "search?title="+title);
    oReq.send();
}

function changeSearch(movies) {
    let listSection = document.getElementById("searchSection");
    let searchResult = document.getElementById("searchResult");
    searchResult.innerHTML = "Results for \"" + document.getElementById("searchMovieText").value + "\""
    listSection.style.visibility = 'visible'
    
    movies = JSON.parse(movies)
    let searchListSection = document.getElementById("searchList");
    searchListSection.innerHTML = '';
    movieList = movies.Search;
    for (i in movieList) {
        let movie = document.createElement("li");
        movie.className = "flex py-1 font-normal text-xl";

        let text = document.createElement("p");
        text.textContent = movieList[i].Title + " (" + movieList[i].Year + ")";
        text.className = "px-2";
        
        let nominateButtonIcon = document.createElement("i");
        nominateButtonIcon.className = "fas fa-plus pt-1 text-green-400";
        nominateButtonIcon.onclick = () => {
            nominateMovie(text.textContent);
        };
        movie.appendChild(nominateButtonIcon);
        movie.appendChild(text);
        searchListSection.appendChild(movie);
    }
}

function nominateMovie(name) {
    if (nominationList.length > 5) {
        console.log("Nomination list exceeds five movies");
        return;
    }
    if (checkNomination(name)) { return; }
    nominationList.push(name);
    console.log(nominationList);
    updateNomination();
}

function updateNomination() {
    let nominationListSection = document.getElementById("nominationList");
    nominationListSection.innerHTML = '';
    for (i in nominationList) {
        let movie = document.createElement("li");
        movie.className = "flex py-1 font-normal text-xl";

        let text = document.createElement("p");
        text.textContent = nominationList[i];
        text.className = "px-2";

        movie.appendChild(text);
        nominationListSection.appendChild(movie);
    }
}

function checkNomination(movie) {
    for (i in nominationList) {
        if (i === movie) {
            console.log("Already Nominated");
            return true;
        }
    }
    return false;
}