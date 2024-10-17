import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../User_head/User_head'


function Random() {
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [rating, setRating] = useState({});

  useEffect(() => {
    async function getTopMovies() {
      const apiKey = 'b6bff5f';
      const baseUrl = 'http://www.omdbapi.com/';
      const keywords = ["god", "father", "sick", "dog", "evil", "dark", "top", "man", "ghost", "hunt", "fear", "night", "see", "good", "once", "disney"];
      const key = Math.floor(Math.random() * keywords.length);

      try {
        const response = await axios.get(baseUrl, {
          params: {
            apikey: apiKey,
            s: keywords[key],
            type: 'movie',
            page: 3
          }
        });

        const movies = response.data.Search.slice(0, 5);
        setMovies(movies);
        setCurrentMovie(movies[0]);
        setRating({ [movies[0].imdbID]: null });
      } catch (error) {
        console.error('Error retrieving top movies:', error);
      }
    }

    getTopMovies();
  }, []);

  const handleNextMovie = () => {
    const currentIndex = movies.indexOf(currentMovie);
    const nextMovies = movies.slice(currentIndex + 1, currentIndex + 6);

    if (nextMovies.length === 5) {
      setMovies(nextMovies);
      setCurrentMovie(nextMovies[0]);
      setRating({ [nextMovies[0].imdbID]: null });
    }
  };

  const handleRateMovie = () => {
    axios
      .get(`https://www.omdbapi.com/?i=${currentMovie.imdbID}&apikey=b6bff5f&rating=${rating[currentMovie.imdbID]}`)
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
    handleNextMovie();
  };

  const handleRatingChange = (event, imdbID) => {
    const { value } = event.target;
    setRating(prevRating => ({
      ...prevRating,
      [imdbID]: value
    }));
  };

  return (
    <div>
      <Header/>
    <div style={{ backgroundColor: "rgba(242, 242, 242, 1)", padding: "20px" }}>
      {movies.length > 0 ? (
        <div>
          {movies.map(movie => (
            <div key={movie.imdbID} style={{ display: "flex", marginBottom: "20px" }}>
              <div style={{ margin: "0 auto", textAlign: "center" }}>
                <img src={movie.Poster} alt={movie.Title} style={{ width: "200px" }} />
                <div>
                  <h2>{movie.Title}</h2>
                  <p>{movie.Plot}</p>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={rating[movie.imdbID] || ""}
                    onChange={(event) => handleRatingChange(event, movie.imdbID)}
                  />
                  <button onClick={handleRateMovie}>Rate</button>
                </div>
              </div>
            </div>
          ))}
          <button onClick={handleNextMovie} style={{ marginTop: "20px" }}>Next</button>
        </div>
      ) : (
        <p>Loading movies...</p>
      )}
    </div>
    </div>
  );
}

export default Random;
