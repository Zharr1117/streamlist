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

  const handleSearch = useCallback(async () => {
    if (!debouncedQuery) return;

    const results = await fetchMovies(debouncedQuery);
    setMovies(results);
    localStorage.setItem("movieSearchResults", JSON.stringify(results));
  }, [debouncedQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const handleAddToStreamList = (movie) => {
    const existingMovies = JSON.parse(localStorage.getItem("movies")) || [];
    if (!existingMovies.some((m) => m.id === movie.id)) {
      const newMovie = {
        id: movie.id,
        title: movie.title,
        overview: movie.overview || "No overview available.",
        poster_path: movie.poster_path,
        addedFromSearch: true,
      };
      const updatedMovies = [...existingMovies, newMovie];
      localStorage.setItem("movies", JSON.stringify(updatedMovies));
      alert(`✅ "${movie.title}" added to StreamList!`);
    } else {
      alert("⚠️ Movie is already in your StreamList.");
    }
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

                <button onClick={() => handleAddToStreamList(movie)}>➕ Add</button>
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
