// src/components/StreamList.js
import React, { useState, useEffect } from "react";
import { fetchMovies } from "../api/tmdb"; // Import TMDB API function
import "./StreamList.css"; // Import CSS for styling

const StreamList = () => {
  // Load movies from local storage or initialize as an empty array
  const [movies, setMovies] = useState(() => {
    return JSON.parse(localStorage.getItem("movies")) || [];
  });

  const [input, setInput] = useState(""); // Input field state
  const [editingIndex, setEditingIndex] = useState(null); // Track which item is being edited
  const [completedMovies, setCompletedMovies] = useState(new Set()); // Store completed movies

  // State for TMDB search functionality
  const [searchQuery, setSearchQuery] = useState(""); // Input for movie search
  const [searchResults, setSearchResults] = useState([]); // Store search results

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies)); // Update local storage
  }, [movies]);

  // Handle adding or updating a movie
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      if (editingIndex !== null) {
        const updatedMovies = [...movies];
        updatedMovies[editingIndex] = input;
        setMovies(updatedMovies);
        setEditingIndex(null);
      } else {
        setMovies([...movies, input]);
      }
      setInput(""); // Clear input field after submit
    }
  };

  // Handle deleting a movie
  const handleDelete = (index) => {
    const updatedMovies = movies.filter((_, i) => i !== index);
    setMovies(updatedMovies);
  };

  // Handle marking a movie as completed
  const handleComplete = (index) => {
    const newCompletedMovies = new Set(completedMovies);
    if (newCompletedMovies.has(index)) {
      newCompletedMovies.delete(index);
    } else {
      newCompletedMovies.add(index);
    }
    setCompletedMovies(newCompletedMovies);
  };

  // Handle editing a movie
  const handleEdit = (index) => {
    setInput(movies[index]); // Load selected movie into input field
    setEditingIndex(index);
  };

  // 🔍 Fetch movies from TMDB based on user search
  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      const results = await fetchMovies(searchQuery);
      setSearchResults(results);
    }
  };

  // Add a searched movie to the watchlist
  const addSearchedMovie = (movieTitle) => {
    if (!movies.includes(movieTitle)) {
      setMovies([...movies, movieTitle]);
    }
  };

  return (
    <div className="streamlist-container">
      <h2>My Streaming List</h2>
      
      {/* Movie Entry Form */}
      <form onSubmit={handleSubmit} className="streamlist-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter movie title"
        />
        <button type="submit">{editingIndex !== null ? "Update" : "Add"}</button>
      </form>

      {/* 🔍 TMDB Movie Search Section */}
      <h3>Search for a Movie</h3>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search movies..."
      />
      <button onClick={handleSearch}>🔎 Search</button>

      {/* Display search results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h4>Search Results:</h4>
          <ul>
            {searchResults.map((movie) => (
              <li key={movie.id}>
                {movie.title} 
                <button onClick={() => addSearchedMovie(movie.title)}>➕ Add</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* User-added movie list */}
      <h3>Movies Added:</h3>
      <ul className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <li key={index} className={completedMovies.has(index) ? "completed" : ""}>
              {movie}
              <button onClick={() => handleEdit(index)}>✏️ Edit</button>
              <button onClick={() => handleComplete(index)}>
                {completedMovies.has(index) ? "✅ Undo" : "✔ Mark as Watched"}
              </button>
              <button onClick={() => handleDelete(index)}>🗑️ Delete</button>
            </li>
          ))
        ) : (
          <p>No movies added yet.</p>
        )}
      </ul>
    </div>
  );
};

export default StreamList;
