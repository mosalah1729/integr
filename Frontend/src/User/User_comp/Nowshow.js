import './css/Upcoming.css'
import spiderverse from '../../Image/spiderverse.jpg'
import blade from '../../Image/blade.jpeg'
import shazam from '../../Image/shazam.jpg'
import johnwick from '../../Image/jw4.jpeg'
import jaws from '../../Image/Jaws.jpeg'
import christopher from '../../Image/chistopher.jpeg'
import avatar from '../../Image/Avatar.jpg'
import evildead from '../../Image/ed2.jpeg'
import batman from '../../Image/new-batman-poster-1634314278488_aab8.jpg'

import { Link } from 'react-router-dom'
import Header from '../User_head/User_head'

import axios from 'axios';
import React, { useState, useEffect } from 'react';

function getCsrfToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
}

function Upcoming(props) {
  const { movieLoc: propMovieLoc } = props; // Extract movieLoc from props
  const { userName } = props;

  // Set default movie location to 'mananthavady' if propMovieLoc is null or undefined
  const movieLoc = propMovieLoc || 'mananthavady'; // Assign default value here

  const [selectedOption, setSelectedOption] = useState('');
  const [displayedOption, setDisplayedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setDisplayedOption(event.target.value);
    props.onSelect(event.target.value); // Call the onSelect function passed in as a prop with the selected value
  };

  console.log(selectedOption);
  console.log(movieLoc);

  const [movie, setMovies] = useState({});

  useEffect(() => {
    const csrftoken = getCsrfToken();

    fetch('/articles/posternow/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify({
        movieLoc: movieLoc, // Ensure movieLoc is not null
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.movie);
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [movieLoc]); // Use movieLoc in the dependency array

  console.log(movie);

  const movies = Object.entries(movie).map(([key, value]) => ({ key, ...value }));

  const posters = {
    shazam: shazam,
    blade: blade,
    spiderverse: spiderverse,
    'evil dead': evildead,
    'john wick 4': johnwick,
    jaws: jaws,
    christopher: christopher,
    avatar: avatar,
    batman: batman,
  };

  return (
    <div style={{ display: 'flex' }}>
      {movies.map((mov) => (
        <div style={{ display: 'flex' }} key={mov.key}>
          <div className="card">
            <div className='img_movie'>
              <Link to='/Ratings' state={{ movieName: mov.name, movieDesc: mov.desc, movieGenre: mov.genre, movieImage: mov.image, movieDir: mov.dir, movieLang: mov.lang, movieLoc: movieLoc }}>
                <img src={posters[mov.name]} alt="Movie Poster" style={{ display: 'flex', height: '300px', width: '240px', borderRadius: '20px 20px 0px 0px' }} />
              </Link>
            </div>
            <div className="container">
              <h4><b>{mov.name}</b></h4>
              <Link
                to="/Theatredetails"
                state={{ movName: mov.name, movGenre: mov.genre, movLang: mov.lang, movieLoc: movieLoc }}
              >
                <button className='book'>Book Ticket</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Upcoming;
