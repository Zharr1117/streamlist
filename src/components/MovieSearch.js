import React, { useState } from 'react';
import { fetchMovies } from '../api/tmdb';
import "./MovieSearch.css"; 

const MovieSearch = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const results = await fetchMovies(query);
        setMovies(results);
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
                <button type="submit">Search</button>
            </form>

            <div className="movie-results">
                {movies.length > 0 ? (
                    <ul>
                        {movies.map((movie) => (
                            <li key={movie.id}>
                                <h3>{movie.title}</h3>
                                <p>{movie.release_date}</p>
                                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
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
