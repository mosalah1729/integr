// import React from 'react'
import '../User_comp/css/Seating.css'
import {Link} from 'react-router-dom'
import React, { useEffect, useState } from 'react';

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



function Seating(props) {
  // original
// const { movieName } = props;
// const { selectedDate } = props;
// const { movieLoc } = props;


// useEffect(() => {

//   const csrftoken = getCookie('csrftoken');

//   fetch('/articles/showtime/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'X-CSRFToken': csrftoken,
//     },
//     body: JSON.stringify({
//       movieName: movieName,
//       selectedDate: selectedDate,
//       movieLoc: movieLoc,
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log('Success:', data);
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
// }, [movieName, selectedDate, movieLoc]);

const { movieName } = props;
const { movieLang } = props;
const { selectedDate } = props;
const { movieLoc } = props;
const { userName } = props;



const [theaterShowtimes, setTheaterShowtimes] = useState([]);
const [capacity, setCapacity] = useState([]);

console.log('datey',selectedDate)
console.log('namey',movieName)
console.log('loc',movieLoc)

useEffect(() => {
  const csrftoken = getCookie('csrftoken');

  fetch('/articles/showtime/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    },
    body: JSON.stringify({
      movieName: movieName,
      selectedDate: selectedDate,
      movieLoc: movieLoc,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      setTheaterShowtimes(data.theater_showtimes);
      
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}, [movieName, selectedDate, movieLoc]);


return (
  <div style={{flex:'1'}}>
    {theaterShowtimes.map((theater) => (
      <div className='Seating_main' key={theater.name}>
        <div className='Seating_name'>
          <span className='Seating_span'>{theater.name}</span>
        </div>
        {theater.showtimes.map((showtime) => (
          <div className='Seating_time' key={showtime.start_time}>
            {/* <Link to='/Ticketbooking'> */}
            
              <Link
                to="/Ticketbooking"
                  state={{  movieName : movieName,selectedDate: selectedDate,movieLang : movieLang,startTime: new Date(showtime.start_time).toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true}),
                  screen: showtime.screen,capacity: showtime.capacity,theater:theater.name,userName:userName,}}>
  <div className='Seating_a' style={{width: 'fit-content'}}>
    <span className='a_span'>{new Date(showtime.start_time).toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})}, {showtime.screen},{showtime.capacity}</span>
  </div>
</Link>




  


          </div>
        ))}
      </div>
    ))}
  </div>
);
        }

export default Seating
