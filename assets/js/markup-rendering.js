import { renderMovieContainer } from "./template.js"
const searchedMovies = document.querySelector('#searched-movies');
const moviesContainer = document.querySelector('#movies-container');
const position = "beforeend";
////////////////////////////////////////////////////////////////// Renderin Functions//////////////////////////////////////////////////
function renderSearchMovies(movies, title) {
    searchedMovies.innerHTML = ''

    const movieBlock = renderMovieContainer(movies, title);
    console.log(movieBlock)
    searchedMovies.appendChild(movieBlock)
}

function renderMovies(movies, title) {
    const movieBlock = renderMovieContainer(movies, title);
    moviesContainer.appendChild(movieBlock)
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////// Markup Function ///////////////////////////////////////////////////////////////

function makeElement(elementName) {
    return document.createElement(elementName)
}

function makeStarRating(rating) {
    const ratingContainer = document.createElement('div');
    ratingContainer.classList = 'stars-outer';

    const ratingElement = document.createElement('div');
    ratingElement.classList = 'stars-inner';

    ratingContainer.insertAdjacentHTML(position, ` <span class="number-rating">${rating}</span>`)

    ratingContainer.appendChild(ratingElement)

    const starPercentage = (rating / 10) * 100;

    // Set width of stars-inner to percentage
    ratingElement.style.width = `${starPercentage}%`;
    return ratingContainer;
}

function createIframe(videos) {
    const iframe = document.createElement('iframe');
    iframe.classList.add('iframe-placeholder');

    console.log('we are inside i frame')
    if (videos.key) {
        iframe.src = `https://www.youtube.com/embed/${videos.key}`
        iframe.width = 360;
        iframe.height = 315;
        iframe.allowFullscreen = true;
    }
    return iframe;
}
export { createIframe, makeStarRating, renderSearchMovies, renderMovies, makeElement }