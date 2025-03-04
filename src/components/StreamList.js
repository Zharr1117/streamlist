// src/components/StreamList.js
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { fetchMovies } from "../api/tmdb";
import "./StreamList.css";

const StreamList = () => {
  const [movies, setMovies] = useState(() => {
    return JSON.parse(localStorage.getItem("movies")) || [];
  });

  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [completedMovies, setCompletedMovies] = useState(new Set());
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

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
        const newMovie = {
          id: uuidv4(),
          title: input,
          overview: "Manually added movie.",
          poster_path: null,
          addedFromSearch: false,
        };
        setMovies([...movies, newMovie]);
        setMessage("✅ Movie Added!");
      }
      setTimeout(() => setMessage(""), 2000);
      setInput("");
    }
  };

  const handleDelete = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  const handleComplete = (id) => {
    setCompletedMovies((prevCompleted) => {
      const newCompleted = new Set(prevCompleted);
      newCompleted.has(id) ? newCompleted.delete(id) : newCompleted.add(id);
      return newCompleted;
    });
  };

  const handleEdit = (id) => {
    const movieToEdit = movies.find((movie) => movie.id === id);
    if (movieToEdit.addedFromSearch) {
      alert("Editing is disabled for TMDB movies.");
      return;
    }
    setInput(movieToEdit.title);
    setEditingId(id);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      const results = await fetchMovies(searchQuery);
      setSearchResults(results);
    }
  };

  const addSearchedMovie = (movie) => {
    if (!movies.some((m) => m.id === movie.id)) {
      const newMovie = {
        id: movie.id,
        title: movie.title,
        overview: movie.overview || "No overview available.",
        poster_path: movie.poster_path,
        addedFromSearch: true,
      };
      setMovies([...movies, newMovie]);
      setMessage(`✅ "${movie.title}" added!`);
      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <div className="streamlist-container">
      <h2>My Streaming List</h2>

      {message && <p className="message">{message}</p>}

      {/* Manual Movie Entry */}
      <form onSubmit={handleSubmit} className="streamlist-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter movie title"
        />
        <button type="submit">{editingId !== null ? "Update" : "Add"}</button>
      </form>

      {/* TMDB Movie Search */}
      <h3>Search for a Movie</h3>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search movies..."
      />
      <button onClick={handleSearch}>🔎 Search</button>

      {searchResults.length > 0 && (
        <div className="search-results">
          <h4>Search Results:</h4>
          <ul>
            {searchResults.map((movie) => (
              <li key={movie.id}>
                {movie.title}
                <button onClick={() => addSearchedMovie(movie)}>➕ Add</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Movie List */}
      <h3>Movies Added:</h3>
      <ul className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <li key={movie.id} className={completedMovies.has(movie.id) ? "completed" : ""}>
              <h4>{movie.title}</h4>
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: "100px", borderRadius: "8px" }}
                />
              )}
              <p>{movie.overview}</p>
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
