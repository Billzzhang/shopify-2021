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
    let searchList = document.getElementById("searchList");
    searchList.innerHTML = '';
    movieList = movies.Search
    console.log(movieList)
    for (i in movieList) {
        let movie = document.createElement("li");
        let text = document.createTextNode(movieList[i].Title + " (" + movieList[i].Year + ")")
        movie.className = "font-normal text-xl"
        movie.appendChild(text);
        searchList.appendChild(movie);

        let nominateButton = document.createElement("button");
    }
    console.log(movieList)
}

$(() => {
    $('button#searchMovieButton').on(
        'click', () => {
            searchMovie();
        }
    )
});