import React, { useState, useEffect } from 'react';
import '../User_comp/css/comment.css';


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
function Comment(props) {
  const { movieName } = props;
  const { movie } = props;
  // const [movie, setMovies] = useState([]);
  const [avg, setAvg] = useState([]);

  // useEffect(() => {
  //   csrftoken = getCookie('csrftoken');

  //   fetch('/articles/reviewsort/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'X-CSRFToken': csrftoken,
  //     },
  //     body: JSON.stringify({
  //       movieName: movieName,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setMovies(data.review);
  //       setAvg(data.average)
  //       console.log('Success:', data);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // }, [movieName]);
   
  const movies = Object.entries(movie).map(([key, value]) => ({ key, ...value }));

  return (
    <div     style={{ height: '400px', overflowY: 'scroll' }}>
      {movies.map((review) => (
        <div className='com_main' key={review.id}>
          <div style={{ display: 'flex' }}>
            {review.score < 40 ? (
              <div className='com_score' style={{ backgroundColor: 'red' }}>
                <span className='com_span'>{review.score}</span>
              </div>
            ) : review.score < 70 ? (
              <div className='com_score' style={{ backgroundColor: 'rgb(255, 204, 0)' }}>
                <span className='com_span'>{review.score}</span>
              </div>
            ) : (
              <div className='com_score' style={{ backgroundColor: 'green' }}>
                <span className='com_span'>{review.score}</span>
              </div>
            )}
            <h2 style={{ marginLeft: '10px' }}>{review.user}</h2>
            <p className='com_p'>{review.review}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comment;
