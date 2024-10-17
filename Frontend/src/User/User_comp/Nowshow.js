import './css/Upcoming.css';
import spiderverse from '../../Image/spiderverse.jpg';
import blade from '../../Image/blade.jpeg';
import shazam from '../../Image/shazam.jpg';
import johnwick from '../../Image/jw4.jpeg';
import christopher from '../../Image/chistopher.jpeg';
import avatar from '../../Image/Avatar.jpg';
import evildead from '../../Image/ed2.jpeg';
import batman from '../../Image/new-batman-poster-1634314278488_aab8.jpg';

import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function Upcoming(props) {
  const { movieLoc, userName, language, genres } = props;

  const [movie, setMovies] = useState({});
  const url="https://a.ltrbxd.com/resized/film-poster/8/3/8/1/4/0/838140-the-substance-0-2000-0-3000-crop.jpg?v=ab9e1072f8"
  console.log('geoonnre', language,genres);
  useEffect(() => {
    const csrftoken = getCookie('csrftoken');

    fetch('/articles/posternow/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify({ movieLoc }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.movie);
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [movieLoc]);

  // Convert movie object to array for easier filtering
  const movies = Object.entries(movie).map(([key, value]) => ({ key, ...value }));

  // Filter movies by selected language and genres
  const filteredMovies = movies.filter((mov) => {
    const matchesLanguage = language ? mov.lang === language : true;
    const matchesGenres = genres.length > 0 ? genres.some(genre => mov.genre.includes(genre)) : true;
    return matchesLanguage && matchesGenres;
  });

  const posters = { shazam, blade, spiderverse, 'evil dead': evildead, 'john wick 4': johnwick, christopher, avatar, batman };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {filteredMovies.map((mov) => (
        <div style={{ display: 'flex' }} key={mov.key}>
          <div className="card">
            <div className="img_movie">
              <Link
                to="/Ratings"
                state={{
                  movieName: mov.name,
                  userName: userName,
                  movieDesc: mov.desc,
                  movieGenre: mov.genre,
                  movieImage: mov.image,
                  movieDir: mov.dir,
                  movieLang: mov.lang,
                }}
              >
                <img
                  src={url}
                  alt="Movie Poster"
                  style={{ display: 'flex', height: '320px', width: '240px', borderRadius: '20px 20px 0px 0px' }}
                />
              </Link>
            </div>

            <div className="container">
              
                <b className='title'>{mov.name}</b>
            
              <Link
                to={userName ? "/Theatredetails" : "/Signin"}
                state={
                  userName
                    ? { movName: mov.name, movGenre: mov.genre, movLang: mov.lang, userName: userName }
                    : {}
                }
              >
                <button className="book">Book Ticket</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Upcoming;
