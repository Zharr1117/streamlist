import axios from 'axios';

const API_KEY = '296c5cd7a5d0adb2c8405c9d858c5d5e'; 
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchMovies = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}/search/movie`, {
            params: {
                api_key: API_KEY,
                query: query,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
};

export { fetchMovies };
