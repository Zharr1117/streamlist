// src/components/MovieSearch.js
import React, { useState, useEffect, useCallback } from "react";
import { fetchMovies } from "../api/tmdb";
import "./MovieSearch.css";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(() => {
    return JSON.parse(localStorage.getItem("movieSearchResults")) || [];
  });
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // ✅ Wrap handleSearch in useCallback to prevent warnings
  const handleSearch = useCallback(async () => {
    if (!debouncedQuery) return;
    
    const results = await fetchMovies(debouncedQuery);
    console.log("Fetched movies:", results); // ✅ Debugging step: Check if results include images
    setMovies(results);
    localStorage.setItem("movieSearchResults", JSON.stringify(results));
  }, [debouncedQuery]);

  // ✅ Debounce the query to reduce API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  // ✅ Ensure handleSearch is in dependency array
  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

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

                {/* ✅ Fix: Only show image if poster_path is available */}
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
