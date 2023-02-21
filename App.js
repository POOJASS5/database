import React, { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import Form from "./components/Form";

let timeoutId;
function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error(
          `Error ${response.status} : something went wrong...Retrying in 5 seconds`
        );
      }
      const data = await response.json();
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          releaseDate: movieData.release_date,
          openingText: movieData.opening_crawl,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
      setIsRetrying(true);
      timeoutId = setTimeout(() => {
        fetchMoviesHandler();
      }, 5000);
    }
    setIsLoading(false);
  }, []);
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);
  let content = <h1>Found no movies...!</h1>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <h1>{error}</h1>;
  }
  if (isLoading) {
    content = <h1>Loading...</h1>;
  }
  const retryingHandler = () => {
    clearTimeout(timeoutId);
    setIsRetrying(false);
    setError(null);
  };
  return (
    <React.Fragment>
      <Form />
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        {isRetrying && <button onClick={retryingHandler}>Stop Retrying</button>}
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}
export default App;