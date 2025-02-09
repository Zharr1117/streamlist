// src/components/StreamList.js
import React, { useState, useEffect } from "react";
import "./StreamList.css"; // 

const StreamList = () => {
  // Load movies from local storage or initialize as an empty array
  const [movies, setMovies] = useState(() => {
    return JSON.parse(localStorage.getItem("movies")) || [];
  });

  const [input, setInput] = useState(""); // Input field state
  const [editingIndex, setEditingIndex] = useState(null); // Track which item is being edited
  const [completedMovies, setCompletedMovies] = useState(new Set()); // Store completed movies

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

  return (
    <div className="streamlist-container">
      <h2>My Streaming List</h2>
      <form onSubmit={handleSubmit} className="streamlist-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter movie title"
        />
        <button type="submit">{editingIndex !== null ? "Update" : "Add"}</button>
      </form>

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
