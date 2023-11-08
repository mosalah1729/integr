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
// import jaws from '../../Image/Jaws.jpeg'
// import inception from '../../Image/Inception.jpeg'
// // import jaws from '../../media/jaws-movie-poster_oEJ6qEs.jpeg'
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
//     //   obj2: { name: 'jaws', age: 30 },
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
//     const posters = { avatar: avatar, jaws: jaws, inception: inception };

//     // const posterUrl = '/media/jaws-movie-poster_oEJ6qEs.jpeg';
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
import jaws from '../../Image/Jaws.jpeg'
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


  const { movieLoc } = props;
 
//   const [selectedOption, setSelectedOption] = useState('');

// const handleOptionSelect = (option) => {
//   setSelectedOption(option);
// };

const [selectedOption, setSelectedOption] = useState('');
  const [displayedOption, setDisplayedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setDisplayedOption(event.target.value);
    props.onSelect(event.target.value); // Call the onSelect function passed in as a prop with the selected value
  };
  console.log(selectedOption)
  console.log('upcoming loc',movieLoc)
  // const [dete, setAbcd] = useState({});

  // useEffect(() => {
  //   axios.get('/get_text/')
  //     .then(response => setAbcd(response.data))
  //     .catch(error => console.error(error));
  // }, []);


  const [abc, setText] = useState('');
  // for testsing app accessing
  useEffect(() => {
    fetch('/articles/my_view/')
      .then(response => response.json())
      .then(data => setText(data.text));
  }, []);

  // const [def, setTxt] = useState('');
  
  // useEffect(() => {
  //   fetch('/my_view/')
  //     .then(response => response.json())
  //     .then(data => setTxt(data.text));
  // }, []);

  
    // const objOfObjs = {
    //   obj1: { name: 'John', age: 25 },
    //   obj2: { name: 'Jane', age: 30 },
    //   obj3: { name: 'Jack', age: 35 },
      

    // };


    // this is main code for movie loop
    const [movie, setMovies] = useState({});

    // useEffect(() => {
    //   fetch('/articles/posternow/')
    //     .then(response => response.json())
    //     .then(data => setMovies(data.movie));
    // }, []);

  //  this is working
    // useEffect(() => {
    //   if (movieLoc) {
    //     const url = `/articles/posternow/?selectedOption=${encodeURIComponent(movieLoc)}`;
    //     fetch(url)
    //       .then(response => response.json())
    //       .then(data => setMovies(data.movie));
    //   }
    // }, [movieLoc]);


//     const url = '/articles/posternow/';
// const options = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({ movieLoc: movieLoc })
// };
// fetch(url, options)
//   .then(response => response.json())
//   .then(data => setMovies(data.movie));



useEffect(() => {
  const csrftoken = getCookie('csrftoken');

  fetch('/articles/posterup/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    },
    body: JSON.stringify({
      // movieName: movieName,
      // selectedDate: selectedDate,
      movieLoc: movieLoc,
    }),
  })
    .then((response) => response.json())
    .then((data) => {setMovies(data.movie)
      console.log('Success:', data);
      // setTheaterShowtimes(data.theater_showtimes);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}, [ movieLoc]);


    


   console.log(movie)
  
    const movies = Object.entries(movie).map(([key, value]) => ({ key, ...value }));

    // const movies = Object.values(mov).map(mov => ({
    //   key: mov.id,
    //   name: mov.name,
    //   genre: mov.genre,
    //   desc: mov.desc
    // }));
    const posters = { shazam: shazam, blade: blade, spiderverse: spiderverse,'evil dead':evildead ,'john wick 4':johnwick,'jaws':jaws,'christopher':christopher,'avatar':avatar,batman:batman};
    // const [mov, setText] = useState('Hello, world!');
    // const mov='varr'
    // const posterUrl = '/media/jaws-mov-poster_oEJ6qEs.jpeg';
  return (
    <div style={{ display: 'flex' }}>
  
  {/* <div>
    {selectedOption && <div> {selectedOption}</div>}
  </div> */}

  {movies.map((mov) => (
    <div style={{display:'flex'}}>
      <div className="card" 
      key={mov.key}
      >
        <div className='img_movie'>
          <Link to='/Ratings' state={ {movieName: mov.name ,movieDesc: mov.desc ,movieGenre: mov.genre ,movieImage: mov.image ,movieDir: mov.dir,movieLang:mov.lang  }}>
          <img src={posters[mov.name]} alt="Movie Poster" style={{ display: 'flex', height: '300px', width: '240px', borderRadius: '20px 20px 0px 0px' }} />
          </Link>
        </div>
        
        <div class="container">
          <h4><b>{mov.name}</b></h4>
          {/* <Link to='/Theatredetails'> selectedOption: selectedOption, */}
          <Link
              to="/Theatredetails"
                state={{  movName : mov.name,movGenre: mov.genre,movLang: mov.lang,}}>
          <button className='book'>Book Ticket</button></Link>
        </div>
        {/* <><span>No Image  </span><div>3 {mov.image} </div></> */}
      </div>
    </div>
  ))} 
</div>

  )
  
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
