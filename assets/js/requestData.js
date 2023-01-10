import {generateUrl, fetchApiData} from "./fetchData.js"
import { renderSearchMovies, renderMovies } from "./markup-rendering.js"
import { createVideoTemplate} from "./template.js"
import { pathRequest } from "./constant.js";

async function searchMovies(value){
    const url = generateUrl(pathRequest.fetchSerachedMovies) + '&query=' + value;
    const movieJsonData = await fetchApiData(url);
     renderSearchMovies(movieJsonData.results, 'Search Result')
}

async function getMovieData(path, title){
    const url = generateUrl(path) 
    const movieJsonData = await fetchApiData(url);
    renderMovies(movieJsonData.results, title)
}

async function getVideos(movieId, content){
    const path = `/movie/${movieId}/videos`;
    const url = generateUrl(path);
    const videoJsonData = await fetchApiData(url)
    createVideoTemplate(videoJsonData.results, content);
}
export{searchMovies ,getVideos , getMovieData }