import React from 'react'
import '../User_comp/css/Rating.css'
import Avatar from '../../Image/Avatar.jpg'
import {Link} from 'react-router-dom'
import  {  useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import spiderverse from '../../Image/spiderverse.jpg'
import blade from '../../Image/blade.jpeg'
import shazam from '../../Image/shazam.jpg'
// import evildead from '../../Image/shazam.jpg'
import johnwick from '../../Image/jw4.jpeg'
// impor from '../../Imag.jpeg'
import christopher from '../../Image/chistopher.jpeg'
import avatar from '../../Image/Avatar.jpg'
import evildead from '../../Image/ed2.jpeg'
import batman from '../../Image/new-batman-poster-1634314278488_aab8.jpg'

// const { movieName } = props;
// const { movieLang } = props;
// const { selectedDate } = props;
// const { movieLoc } = props;
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

function Rating(props) {
  // console.log(props.mov);
  // const movieName = props.location.state.movieName;
  // console.log(movieName);
  const location = useLocation();

  const movieName = location.state?.movieName;
  const movieDesc = location.state?.movieDesc;
  const movieGenre = location.state?.movieGenre;
  const movieImage = location.state?.movieImage;
  const movieDir = location.state?.movieDir;
  const movieLang = location.state?.movieLang;
  const movieUrl = location.state?.movieUrl;
  const userName = location.state?.userName;
  const movieLoc = location.state?.movieLoc;
  
  console.log("ratingilethi",userName)

  React.useEffect(() => {
    console.log('location from', location);
    console.log('movie name:', movieName);
  }, [location, movieName]);
  
  const posters = { shazam: shazam, blade: blade, spiderverse: spiderverse,'evil dead':evildead ,'john wick 4':johnwick,'christopher':christopher,'avatar':avatar,batman:batman};


  useEffect(() => {
    const csrftoken = getCookie('csrftoken');
  
    fetch('/articles/predict/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify({
        userName:userName
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('predicted:', data);
        
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [ userName]);

  

return (
  <div className='rate_main'>
    <div className='rate_submain'>
     <div className='rate_movie'>
      <img className='rate_image' src= {movieUrl} alt='nothing'></img>
     </div>
     <div style={{marginTop:'485px',marginLeft:'-331px'}}>
     {/* <Link to='/Theatredetails'> <button className=''><b>Book Ticket</b></button></Link> */}
     <Link
              to={userName ? "/Theatredetails" : "/Signin"}
                state={{  movName : movieName,movGenre: movieGenre,movLang: movieLang,userName:userName,movieLoc:movieLoc,}}>
          <button className='rate_button'><b>Book Ticket</b></button></Link>
     </div>
    </div> 
    <div className='rate_sec'>
     <div  className='rate_score'>
         <h1>predicted rating</h1>
         <div style={{
position: 'absolute',
width: '60px',
height: '60px',
backgroundColor: '#4ad0ef',
borderRadius: '16px',
display: 'flex',
justifyContent: 'center',
alignItems: 'center',
color: '#000000',

fontWeight: 'bold',
fontSize: '24px'
}}>
86
</div>




     </div>

     <div style={{
  fontSize: '19px',
  fontWeight: 'bold',
  lineHeight: '.8'  // Adjusts line spacing
}}>
  <h1>{movieName}</h1>
  <p><b>Genre:</b> {movieGenre}</p>
  <p><b>Director:</b> {movieDir}</p>
  <p><b>Language:</b> {movieLang}</p>
</div>


  <div className='rate_score' style={{
position: 'relative',
top: '-134px',
left: '0px'
}}>
<h1>your score:  </h1>
<input type="text" style={{
  borderRadius: '8px',
  width: '96px',
  backgroundColor: 'rgb(220 234 240)',
  border: '1px solid #ccc',  // Ensures a visible border
  outline: 'none',           // Removes the default blue outline on focus
  padding: '8px',            // Adds padding inside the input
}} />

<div>
<button style={{
  backgroundColor: '#4ad0ef',
  color: '#000000',
  position: 'relative',
  top: '10px',
  width: '115px',
  height: '39px',
  left: '0px',
  fontSize: '20px',
  fontWeight: 'bold',
  borderRadius: '8px',
  padding: '8px 16px',
  border: 'none'
}}>
  Submit
</button>

</div>

</div>


<div className='rate_score' style={{
position: 'relative',
top: '-100px',
left: '0px'
}}>
      <h1>Synopsis</h1>
      <div style={{

fontSize: '20px',
fontWeight: 'bold',



}}>{movieDesc}</div>
    </div>
    <div   className='rate_score1'  style={{
position: 'relative',
top: '-220px',
left: '0px'
}}>
      <h1>User ratings</h1>
      
      <Link
              to="/Userreview"
                state={{  movieName : movieName,userName: userName,}}>
        <div><button className='rate_rev' style={{
  backgroundColor: '#4ad0ef',
  color: '#000000',
  position: 'relative',
  top: '53px',
  left: '-220px',
  height: '40px',
  fontSize: '18px',
  fontWeight: 'bold',
  borderRadius: '8px',
  padding: '8px 16px',
  border: 'none'
}}>
  Click here
</button>
</div>
      
      </Link>
    </div>
    </div> 
  </div>
)
}

export default Rating









