// const API_KEY ='6b99193b237e623f51d48944c99e581b'
// const url = 'https://api.themoviedb.org/3/search/movie?api_key=6b99193b237e623f51d48944c99e581b'

function generateUrl(path) {
    const url = `https://api.themoviedb.org/3${path}?api_key=6b99193b237e623f51d48944c99e581b`
    return url;
}

async function fetchApiData(url) {
    try {
        let movieData = await fetch(url)
        let movieJson = await movieData.json()
        return movieJson
    }
    catch (err) {
        console.log(err);
    }
}
export { generateUrl, fetchApiData }