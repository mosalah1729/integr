import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
  const { movieLoc } = props;
  const { userName } = props;
  const [movies, setMovies] = useState([]);
  const [response, setResponse] = useState('');

  useEffect(() => {
    // Function to fetch data from the Django backend
    const fetchData = async () => {
      try {
        const result = await axios.get('/articles/my_view/'); // Replace with your Django server URL
        setResponse(result.data.text);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const csrftoken = getCookie('csrftoken');

    const fetchData = async () => {
      try {
        const response = await axios.post('/articles/posternow/', { movieLoc }, {
          headers: {
            'X-CSRFToken': csrftoken
          }
        });
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    if (movieLoc) {
      fetchData();
    }
  }, [movieLoc]);

  return (
    <div>
      

      {movies.map((mov) => (
        <div key={mov.key}>
          <h4>{mov.name}</h4>
          <Link to="/Theatredetails" state={{ movName: mov.name, movGenre: mov.genre, movLang: mov.lang, userName: props.userName }}>
            <button>Book Ticket</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Upcoming;



// import './css/Upcoming.css';
// import spiderverse from '../../Image/spiderverse.jpg';
// import blade from '../../Image/blade.jpeg';
// import shazam from '../../Image/shazam.jpg';
// import { Link } from 'react-router-dom';
// import Header from '../User_head/User_head';
// import axios from 'axios';
// import React, { useState, useEffect } from 'react';

// function Upcoming() {
//   const [selectedOption, setSelectedOption] = useState('');
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     if (selectedOption) {
//       axios
//         .get(`/articles/posternow/?selectedOption=${encodeURIComponent(selectedOption)}`)
//         .then((response) => setMovies(response.data.movie))
//         .catch((error) => console.error(error));
//     }
//   }, [selectedOption]);

//   const posters = { shazam: shazam, blade: blade, spiderverse: spiderverse };

//   return (
//     <div>
//       <h1>Home</h1>
//       {selectedOption && <div>{selectedOption}</div>}
//       {movies.map((movie) => (
//         <div style={{ display: 'flex' }}>
//           <div className="card" key={movie.id}>
//             <div className="img_movie">
//               <Link
//                 to="/Ratings"
//                 state={{
//                   movieName: movie.name,
//                   movieDesc: movie.desc,
//                   movieGenre: movie.genre,
//                   movieImage: movie.image,
//                   movieDir: movie.director,
//                 }}
//               >
//                 <img
//                   src={movie.image}
//                   alt="Movie Poster"
//                   style={{ display: 'flex', height: '300px', width: '240px', borderRadius: '20px 20px 0px 0px' }}
//                 />
//               </Link>
//             </div>

//             <div class="container">
//               <h4>
//                 <b>{movie.name}</b>
//               </h4>

//               <Link to="/Theatredetails">
//                 {' '}
//                 <button className="book">Book Ticket</button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// function UpcomingPage() {
//   const [selectedOption, setSelectedOption] = useState('');

//   return (
//     <div>
//       <Header onSelect={setSelectedOption} />
//       <Upcoming selectedOption={selectedOption} />
//     </div>
//   );
// }

// export default UpcomingPage;
