import { pathRequest } from "./constant.js";
import { createIframe, makeStarRating, makeElement } from "./markup-rendering.js";
const position = "beforeend";

function renderMovieContainer(movies, title = '') {
    const movieElement = makeElement('div');
    movieElement.setAttribute('class', 'movie');

    const header = makeElement('h2');
    header.innerHTML = title

    const section = movieSection(movies);

    movieElement.appendChild(header);
    movieElement.appendChild(section);

    return movieElement;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
function movieSection(movies) {
    const section = makeElement('section');
    section.classList = 'section';
    movies.map((movie) => {
        if (movie.poster_path) {
            // make movie card
            const movieCard = makeElement('div');
            movieCard.classList = 'movie-card';
            section.appendChild(movieCard);

            // add image to mvie card
            const img = makeElement('img')
            img.src = pathRequest.imagePath + movie.poster_path;
            img.setAttribute('data-movie-id', movie.id)
            movieCard.appendChild(img)

            // add details to th movie card 
            const cardDeatil = makeMovieCardDetails(movie);
            movieCard.insertAdjacentHTML(position, cardDeatil);

            // add the realted videos to the movie card
            const loadinContent = makeElement('div');
            loadinContent.classList = 'loadinContent';
            const loadinContentData = `<p>....</p>`
            loadinContent.innerHTML = loadinContentData;

            const content = makeElement('div');
            content.classList = 'content';
            const contentClose = `<p id="content-close"><i class="fa fa-close"></i> Close</p>`
            content.innerHTML = contentClose;

            movieCard.appendChild(loadinContent);
            movieCard.appendChild(content);
        }
    })
    return section;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function makeMovieCardDetails(movie) {
    const ratings = makeStarRating(movie.vote_average);
    const movieCardDetails = `<div class="movie-details">
            <div class="details__content details__header">
                <p class="movie__name">${movie.original_title}</p>
                <span class="movie__heart"><i class="fa fa-heart"></i></span>
            </div>
            <div class="details__content details__body">
                <p class="movie__genre">Thriller</p>
                
            </div>
            <div class="details__content details__footer">
                   ${ratings.outerHTML}
                <p class="movie__showmore-link"><a href="movie-details.html?id=${movie.id}">show more</a></p>
            </div>
        </div>`;
    return movieCardDetails;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function createVideoTemplate(videosArray, content) {
    const IframePromisearray = [];
    const loadinContent = content.previousSibling;

    content.innerHTML = '<p id="content-close"><i class="fa fa-close"></i>Close</p>'
    const videos = videosArray.filter((video) => {
        return video.type.toLowerCase() == 'trailer' || video.type.toLowerCase() == 'teaser' || video.type.toLowerCase() == 'clip'
    })
    const lengthOfVideoArray = videos.length;
    const length = lengthOfVideoArray > 2 ? 2 : lengthOfVideoArray;
    const iframeConatiner = makeElement('div');

    for (let i = 0; i < length; i++) {
        const video = videos[i];// video
        const iframe = createIframe(video);
        iframeConatiner.appendChild(iframe)
        const iframePromise = new Promise((resolve, reject) => {
            iframe.onload = () => {
                resolve();
            }
        })
        IframePromisearray.push(iframePromise);
    }
    loadinContent.classList.add('loadinContent-display');
    content.appendChild(iframeConatiner)
    Promise.all(IframePromisearray).then(() => {
        iframeConatiner.onload = loadinContent.classList.remove('loadinContent-display')
        iframeConatiner.onload = content.classList.add('content-display');
    })

}
export { movieSection, renderMovieContainer, createVideoTemplate, createIframe };