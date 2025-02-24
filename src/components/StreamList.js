// src/components/StreamList.js
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { fetchMovies } from "../api/tmdb";
import "./StreamList.css";

const StreamList = () => {
  // ✅ Load movies from localStorage or initialize an empty array
  const [movies, setMovies] = useState(() => {
    return JSON.parse(localStorage.getItem("movies")) || [];
  });

  // ✅ Individual state variables
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [completedMovies, setCompletedMovies] = useState(new Set());
  const [message, setMessage] = useState(""); // ✅ Success message state

  // ✅ Movie search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // ✅ Save movies to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
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
        setMessage("✅ Movie Updated!");
      } else {
        setMovies([...movies, { id: uuidv4(), title: input }]);
        setMessage("✅ Movie Added!");
      }
      setTimeout(() => setMessage(""), 2000);
      setInput("");
    }
  };

  // ✅ Handle deleting a movie
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

  // ✅ Handle TMDB movie search
  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      const results = await fetchMovies(searchQuery);
      setSearchResults(results);
    }
  };

  // ✅ Add searched movie to list
  const addSearchedMovie = (movieTitle) => {
    if (!movies.some((movie) => movie.title === movieTitle)) {
      setMovies([...movies, { id: uuidv4(), title: movieTitle }]);
      setMessage(`✅ "${movieTitle}" added!`);
      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <div className="streamlist-container">
      <h2>My Streaming List</h2>

      {/* ✅ Success message */}
      {message && <p className="message">{message}</p>}

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

      {/* ✅ Search Movies via TMDB API */}
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

      {/* ✅ Display user-added movie list */}
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
