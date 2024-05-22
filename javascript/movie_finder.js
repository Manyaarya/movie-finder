document.addEventListener("DOMContentLoaded", function() {
    const API_URL_SEARCH = "https://www.omdbapi.com/?apikey=c8490cba";

    var search_input = document.getElementById("search-input");
    var card = document.getElementsByClassName("movie-cards")[0];
    var search_button = document.getElementsByClassName("search")[0];

    // Debugging logs to check if elements are found
    console.log('search_input:', search_input);
    console.log('card:', card);
    console.log('search_button:', search_button);

    if (search_input && search_button && card) {
        search_button.addEventListener("click", function() {
            console.log(search_input.value);
            const query = search_input.value;
            if (query) {
                getMovies(API_URL_SEARCH + "&s=" + query);
            }
        });
    } else {
        console.error('One or more elements were not found.');
    }

    async function getMovies(url) {
        const resp = await fetch(url);
        const respData = await resp.json();
        console.log(respData);
        showMovies(respData.Search);
    }

    function showMovies(movies) {
        card.innerHTML = "";
        movies.forEach(async function(movie) {
            const movieData = await fetch(API_URL_SEARCH + "&i=" + movie.imdbID);
            const movieDataObj = await movieData.json();
            movie_display(movieDataObj);
        });
    }

    function movie_display(imovie) {
        const movieElm = document.createElement("div");
        movieElm.classList.add("movie-card");
        movieElm.innerHTML = `
            <div class="card">
                <img src="${imovie.Poster}" alt="Poster" width="300px" height="300px"/>
                <br>
                <div class="movie-description">
                    <span class="movie-title"><b>Title: </b><span class="value">${imovie.Title}</span></span><br>
                    <span class="movie-rating"><b>Rating: </b><span class="value">${imovie.imdbRating}</span></span><br>
                    <span class="movie-director"><b>Director: </b><span class="value">${imovie.Director}</span></span><br>
                    <span class="movie-released"><b>Released Date: </b><span class="value">${imovie.Released}</span></span><br>
                    <span class="movie-genre"><b>Genre: </b><span class="value">${imovie.Genre}</span></span>
                </div>
            </div>
        `;
        card.appendChild(movieElm);
    }
});
