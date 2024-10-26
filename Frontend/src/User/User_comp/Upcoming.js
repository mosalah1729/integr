// // // import React from 'react'
// // import './css/Upcoming.css'
// // import Avatar from '../../Image/Avatar.jpg'

// // import axios from 'axios';
// // import React, { useState, useEffect } from 'react';




// // // import React from 'react'
// // import './css/Theatre.css'
// // // import Seating from '../User_comp/Seating'

// // // import { getCookie } from './utils';






// // function Upcoming() {



// //   const [movies, setMovies] = useState([]);

// //   useEffect(() => {
// //     fetch('/poster/')
// //       .then(response => response.json())
// //       .then(data => setMovies(data.text));
// //   }, []);



// //   return (


// //     {movies.map((movie) => (
// //       <div style={{display:'flex'}}>
// //      {/* <div class="card">
// //       <div className='img_movie'>
// //   <img src={Avatar} alt="Avatar"  style={{display: 'flex', height: '300px',width: '240px',borderRadius:'20px 20px 0px 0px'}}/>
// //   </div>
// //   <div class="container">
// //     <h4><b>Movie name</b></h4>
// //     <button className='book'>Book Ticket</button>
// //   </div>
// // </div> */}
// // <div class="card">
// //       <div className='img_movie'>
// //   <img src={movie.image.url} alt="Avatar"  style={{display: 'flex', height: '300px',width: '240px',borderRadius:'20px 20px 0px 0px'}}/>
// //   </div>
// //   <div class="container">
// //     <h4><b>{movie.name}</b></h4>
// //     <button className='book'>Book Ticket</button>
// //   </div>
// // </div>
// // </div>
// //     ))}





// //     // {dests.map((dest) => (
// //     //   <div className="destination item">
// //     //     <div className="destination_image">
// //     //       <img src={dest.image.url} alt="" />
// //     //     </div>
// //     //     <div className="destination_content">
// //     //       {user.is_authenticated ? (
// //     //         <div className="destination_title">
// //     //           <a href="destinations/destination">{dest.name}</a>
// //     //         </div>
// //     //       ) : (
// //     //         <div className="destination_title">
// //     //           <a href="account/login">{dest.name}</a>
// //     //         </div>
// //     //       )}
// //     //       <div className="destination_subtitle">
// //     //         <p>
// //     //           {dest.desc}
// //     //           {mum.price}
// //     //         </p>
// //     //       </div>
// //     //       <div className="destination_price">From ${dest.price}</div>
// //     //     </div>
// //     //   </div>
// //     // ))}
    


    




   
    
// //   )
// // }

// // export default Upcoming
// import './css/Upcoming.css'
// import avatar from '../../Image/Avatar2.jpg'
// import  from '../../Image/.jpeg'
// import inception from '../../Image/Inception.jpeg'
// // import  from '../../media/-movie-poster_oEJ6qEs.jpeg'
// import {Link} from 'react-router-dom'

// import axios from 'axios';
// import React, { useState, useEffect } from 'react';


// // function MoviePoster(props) {
// //   return (
// //     <img src={props.posterUrl} alt="Movie Poster" />
// //   );
// // }

// function Upcoming() {

 

//   const [data, setAbcd] = useState({});

//   useEffect(() => {
//     axios.get('/get_text/')
//       .then(response => setAbcd(response.data))
//       .catch(error => console.error(error));
//   }, []);


//   // const [abc, setText] = useState('');
//   // for testsing app accessing
//   // useEffect(() => {
//   //   fetch('/articles/my_view/')
//   //     .then(response => response.json())
//   //     .then(data => setText(data.text));
//   // }, []);

//   // const [def, setTxt] = useState('');
  
//   // useEffect(() => {
//   //   fetch('/my_view/')
//   //     .then(response => response.json())
//   //     .then(data => setTxt(data.text));
//   // }, []);

  
//     // const movie = {
//     //   obj1: { name: 'avatar', age: 25 },
//     //   obj2: { name: '', age: 30 },
//     //   obj3: { name: 'inception', age: 35 },
      

//     // };


    
//     const [movie, setMovies] = useState({});

//     useEffect(() => {
//       fetch('/posterup/')
//         .then(response => response.json())
//         .then(data => setMovies(data.movie));
//     }, []);
  
  
//     const movies = Object.entries(movie).map(([key, value]) => ({ key, ...value }));

//     // const movies = Object.values(movie).map(movie => ({
//     //   key: movie.id,
//     //   name: movie.name,
//     //   genre: movie.genre,
//     //   desc: movie.desc
//     // }));
//     const posters = { avatar: avatar, : , inception: inception };

//     // const posterUrl = '/media/-movie-poster_oEJ6qEs.jpeg';
//   return (
//     <div style={{ display: 'flex' }}>
//     {movies.map((movie) => (
//       <div style={{display:'flex'}}>
//         <div class="card" key={movie.key}>
//           <div className='img_movie'>
//           {/* <MoviePoster posterUrl={posterUrl} /> */}
//            <Link to='/Ratings'>
//            {/* <Link to={{ pathname: '/Ratings', state: { name: movie.name } }}> */}
//            {/* {posters[movie.name]}{movie.image} */}
//            <img src={posters[movie.name]} alt={movie.name}  style={{display: 'flex', height: '300px',width: '240px',borderRadius:'20px 20px 0px 0px'}}/>
//            </Link>
//           </div>
//           {/* {movie.image} */}
//           <div class="container">
//             {/* <div>{abc} {def}</div> */}
//             <h4><b>{movie.name}</b></h4>
//             {/* {movie.desc} {movie['name']} */}
//             <Link to='/Theatredetails'> <button className='book'>Book Ticket</button></Link>

//           </div>
//           {/* <div>
//         <p>Name: {data.name}</p>
//         <p>Age: {data.age}</p>
//         <p>gmail: {data.email}</p>
//         <p>url: {data.image}</p>
//           </div> */}
//         </div>
//       </div>
//      ))} 
//     {/* <div>{def}</div> */}
//     </div>
//   )
  
// }

// export default Upcoming




// here starts the copied working nowshowing

import './css/Upcoming.css'
import spiderverse from '../../Image/spiderverse.jpg'
import blade from '../../Image/blade.jpeg'
import shazam from '../../Image/shazam.jpg'
// import evildead from '../../Image/shazam.jpg'
import johnwick from '../../Image/jw4.jpeg'
// import  from '../../Image/.jpeg'
import christopher from '../../Image/chistopher.jpeg'
import avatar from '../../Image/Avatar.jpg'
import evildead from '../../Image/ed2.jpeg'
import batman from '../../Image/new-batman-poster-1634314278488_aab8.jpg'


import {Link} from 'react-router-dom'
import Header from '../User_head/User_head'

import axios from 'axios';
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

function Nowshowing(props) {
  const { movieLoc, userName, language, genres } = props;

  const [movie, setMovies] = useState({});
  const url="https://a.ltrbxd.com/resized/film-poster/8/3/8/1/4/0/838140-the-substance-0-2000-0-3000-crop.jpg?v=ab9e1072f8"
  console.log('geoonnre', language,genres);
  useEffect(() => {
    const csrftoken = getCookie('csrftoken');

    fetch('/articles/posterup/', {
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
                  movieUrl: mov.url,
                }}
              >
                <img
                  src={mov.url}
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
                <button className="book" disabled style={{
  backgroundColor: '#ccc',  // Gray background
  color: '#666',            // Dimmed text color
  cursor: 'not-allowed',    // Changes cursor to indicate it's unclickable
  borderBottomLeftRadius: '20px',
  borderBottomRightRadius: '20px'
}}>
  Coming Soon
</button>


              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Nowshowing




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
