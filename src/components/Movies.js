// src/components/Movies.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=296c5cd7a5d0adb2c8405c9d858c5d5e`
        );
        setMovies(response.data.results.slice(0, 10)); // Display top 10 movies
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Popular Movies</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
