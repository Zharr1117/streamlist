// src/components/MovieSearch.js
import React, { useState, useEffect } from "react";
import { fetchMovies } from "../api/tmdb";
import "./MovieSearch.css";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(() => {
    return JSON.parse(localStorage.getItem("movieSearchResults")) || [];
  });

  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      handleSearch();
    }
  }, [debouncedQuery]);

  const handleSearch = async () => {
    const results = await fetchMovies(debouncedQuery);
    setMovies(results);
    localStorage.setItem("movieSearchResults", JSON.stringify(results));
  };

  return (
    <div className="movie-search">
      <h2>Search for a Movie</h2>
      <input
        type="text"
        placeholder="Enter movie title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>🔎 Search</button>

      <div className="movie-results">
        {movies.length > 0 ? (
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <h3>{movie.title}</h3>
                <p>📅 Release Date: {movie.release_date || "Unknown"}</p>
                <p>⏳ Movie Length: {movie.runtime ? `${movie.runtime} min` : "N/A"}</p>

                {/* ✅ Display movie poster or fallback image */}
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-poster"
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/200x300?text=No+Image"
                    alt="No poster available"
                    className="movie-poster"
                  />
                )}

                <button>➕ Add</button>
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
