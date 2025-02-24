// src/components/MovieSearch.js
import React, { useState } from 'react';
import { fetchMovies } from '../api/tmdb';
import "./MovieSearch.css";

const MovieSearch = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState(() => {
        return JSON.parse(localStorage.getItem('movieSearchResults')) || [];
    });

    // ✅ Only search when the user presses "Enter"
    const handleSearch = async (e) => {
        e.preventDefault();
        if (query.trim() !== "") {
            const results = await fetchMovies(query);
            setMovies(results);
            localStorage.setItem('movieSearchResults', JSON.stringify(results));
        }
    };

    return (
        <div className="movie-search">
            <h2>Search for a Movie</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Enter movie title..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">🔎 Search</button>
            </form>

            <div className="movie-results">
                {movies.length > 0 ? (
                    <ul>
                        {movies.map((movie) => (
                            <li key={movie.id}>
                                <h3>{movie.title}</h3>
                                <p>{movie.release_date}</p>
                                {movie.poster_path ? ( 
                                    <img 
                                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                                        alt={movie.title} 
                                    />
                                ) : (
                                    <p>No Image Available</p> 
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    );
};

export default MovieSearch;
