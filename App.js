import React, { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

// let timeoutId;
function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [isRetrying, setIsRetrying] = useState(false);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
       
        "https://rect-http-73f7e-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error(
          `Error ${response.status} : something went wrong...Retrying in 5 seconds`
        );
      }
      const data = await response.json();

      const transformedMovies = [];
      for (const key in data) {
        transformedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
      // setIsRetrying(true);
      // timeoutId = setTimeout(() => {
      //   fetchMoviesHandler();
      // }, 5000);
    }
    setIsLoading(false);
  }, []);
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const onDeleteHandler = () => {
    fetchMoviesHandler();
  };

  let content = <h1>Found no movies...!</h1>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} onDelete={onDeleteHandler} />;
  }

  if (error) {
    content = <h1>{error}</h1>;
  }
  if (isLoading) {
    content = <h1>Loading...</h1>;
  }

  // const retryingHandler = () => {
  //   clearTimeout(timeoutId);
  //   setIsRetrying(false);
  //   setError(null);
  // };
  return (
    <React.Fragment>
      <AddMovie onAdd={onDeleteHandler} />
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        {/* {isRetrying && <button onClick={retryingHandler}>Stop Retrying</button>} */}
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}
export default App;