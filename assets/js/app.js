// import { renderMovieContainer } from "./template.js"
import { searchMovies, getVideos, getMovieData } from "./requestData.js"
import { pathRequest } from "./constant.js";

// selecting the input
const searchButton = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');

(async function(){
await searchMovies('Naruto');
await getMovieData(pathRequest.fetchUpcomingMovies, pathRequest.UpcomingMoviesTitle);
await getMovieData(pathRequest.fetchPopularMovies, pathRequest.PopularMoviesTitle);
await getMovieData(pathRequest.fetchTopratedMovies, pathRequest.TopratedMoviesTitle);

})();

// search a movie
searchButton.onclick = function (event) {
    event.preventDefault();
    const value = inputElement.value;
    searchMovies(value)
    inputElement.value = ''
}

// event delegation
document.onclick = function (event) {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'img') {
        const card = event.target.parentElement;
        console.log(card, 'mmmmmmmmmmmm')
        const content = card.querySelector('.content');

        const movieId = target.dataset.movieId;
        getVideos(movieId, content)
    }
    if (target.id == 'content-close') {
        const content = target.parentElement;
        content.classList.remove('content-display');
    }
}
