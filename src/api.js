import { API_READ_ACCESS_TOKEN } from './conf';

const headers = {
    accept: 'application/json',
    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`
}

export async function getData() {

    const options = {
        method: 'GET',
        headers
    };

    const data = await fetch(
        'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
        options
    )
        .then(response => {
            return response.json();
        })
        .catch(err => console.error(err));

    return data;
}

export async function getMovieImages(movieId) {
    const options = {
        method: 'GET',
        headers
    };

    const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/images`,
        options
    )
        .then(response => {
            return response.json();
        })
        .catch(err => console.error(err));

    return data;
}

export async function getMovieDetails(movieId) {
    const options = {
        method: 'GET',
        headers
    };

    const data = fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        options
    )
        .then(response => {
            return response.json();
        })
        .catch(err => console.error(err));

    return data;
}
