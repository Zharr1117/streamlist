// src/components/StreamList.js
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";  // ✅ Import UUID for unique movie IDs
import { fetchMovies } from "../api/tmdb"; // ✅ Import TMDB API function
import "./StreamList.css"; // ✅ Import CSS for styling

const StreamList = () => {
  // ✅ Load movies from local storage or initialize as an empty array
  const [movies, setMovies] = useState(() => {
    return JSON.parse(localStorage.getItem("movies")) || [];
  });

  const [input, setInput] = useState(""); // ✅ Input field state
  const [editingId, setEditingId] = useState(null); // ✅ Track which item is being edited
  const [completedMovies, setCompletedMovies] = useState(new Set()); // ✅ Store completed movies

  // ✅ State for TMDB search functionality
  const [searchQuery, setSearchQuery] = useState(""); // Input for movie search
  const [searchResults, setSearchResults] = useState([]); // Store search results

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies)); // ✅ Update local storage
  }, [movies]);

  // ✅ Handle adding or updating a movie
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      if (editingId !== null) {
        setMovies(movies.map((movie) =>
          movie.id === editingId ? { ...movie, title: input } : movie
        ));
        setEditingId(null);
      } else {
        setMovies([...movies, { id: uuidv4(), title: input }]); // ✅ Assign unique UUID
      }
      setInput(""); // ✅ Clear input field after submit
    }
  };

  // ✅ Handle deleting a movie by ID
  const handleDelete = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  // ✅ Handle marking a movie as completed
  const handleComplete = (id) => {
    setCompletedMovies((prevCompleted) => {
      const newCompleted = new Set(prevCompleted);
      newCompleted.has(id) ? newCompleted.delete(id) : newCompleted.add(id);
      return newCompleted;
    });
  };

  // ✅ Handle editing a movie
  const handleEdit = (id) => {
    const movieToEdit = movies.find((movie) => movie.id === id);
    setInput(movieToEdit.title);
    setEditingId(id);
  };

  // 🔍 Fetch movies from TMDB based on user search
  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      const results = await fetchMovies(searchQuery);
      setSearchResults(results);
    }
  };

  // ✅ Add a searched movie to the watchlist
  const addSearchedMovie = (movieTitle) => {
    if (!movies.some((movie) => movie.title === movieTitle)) {
      setMovies([...movies, { id: uuidv4(), title: movieTitle }]); // ✅ Assign unique UUID
    }
  };

  return (
    <div className="streamlist-container">
      <h2>My Streaming List</h2>
      
      {/* ✅ Movie Entry Form */}
      <form onSubmit={handleSubmit} className="streamlist-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter movie title"
        />
        <button type="submit">{editingId !== null ? "Update" : "Add"}</button>
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

      {/* ✅ Display search results */}
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

      {/* ✅ User-added movie list */}
      <h3>Movies Added:</h3>
      <ul className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <li key={movie.id} className={completedMovies.has(movie.id) ? "completed" : ""}>
              {movie.title}
              <button onClick={() => handleEdit(movie.id)}>✏️ Edit</button>
              <button onClick={() => handleComplete(movie.id)}>
                {completedMovies.has(movie.id) ? "✅ Undo" : "✔ Mark as Watched"}
              </button>
              <button onClick={() => handleDelete(movie.id)}>🗑️ Delete</button>
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
