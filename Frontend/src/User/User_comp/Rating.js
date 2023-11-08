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
import jaws from '../../Image/Jaws.jpeg'
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
  const userName = location.state?.userName;
  
  console.log("ratingilethi",userName)

  React.useEffect(() => {
    console.log('location from', location);
    console.log('movie name:', movieName);
  }, [location, movieName]);
  
  const posters = { shazam: shazam, blade: blade, spiderverse: spiderverse,'evil dead':evildead ,'john wick 4':johnwick,'jaws':jaws,'christopher':christopher,'avatar':avatar,batman:batman};


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
      <img className='rate_image' src= {posters[movieName]} alt='nothing'></img>
     </div>
     <div style={{marginTop:'485px',marginLeft:'-331px'}}>
     {/* <Link to='/Theatredetails'> <button className=''><b>Book Ticket</b></button></Link> */}
     <Link
              to="/Theatredetails"
                state={{  movName : movieName,movGenre: movieGenre,movLang: movieLang,userName:userName}}>
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
backgroundColor: '#FF640D',
borderRadius: '16px',
display: 'flex',
justifyContent: 'center',
alignItems: 'center',
color: '#FFFFFF',

fontWeight: 'bold',
fontSize: '24px'
}}>
86
</div>




     </div>

     <div style={{

fontSize: '18px',
fontWeight: 'bold',



}}>
     <h1 >{movieName}</h1>
      <b>Genre:</b>{movieGenre}
    {/* <p><h3>Director:</h3><span>{movieDir}</span></p> */}
    <p><b >Director:</b>{movieDir}</p>
    <p><b >Language:</b>{movieLang}</p>


  </div>
  <div className='rate_score' style={{
position: 'relative',
top: '-100px',
left: '0px'
}}>
<h1>your score:  </h1>
<input type="text" style={{
borderRadius: '8px'
}} />
<div>
<button style={{
backgroundColor: '#FF640D',
color: '#FFFFFF',
position: 'relative',
top: '10px',
left: '0px',
fontSize: '18px',
fontWeight: 'bold',
borderRadius: '8px',
padding: '8px 16px',
border: 'none'
}}>submit</button>
</div>

</div>


<div className='rate_score' style={{
position: 'relative',
top: '-100px',
left: '0px'
}}>
      <h1>Synopsis</h1>
      <div style={{

fontSize: '25px',
fontWeight: 'bold',



}}>{movieDesc}</div>
    </div>
    <div   className='rate_score1'  style={{
position: 'relative',
top: '-200px',
left: '0px'
}}>
      <h1>User ratings</h1>
      
      <Link
              to="/Userreview"
                state={{  movieName : movieName,userName: userName,}}>
        <div><button className='rate_rev'style={{
backgroundColor: '#FF640D',
color: '#FFFFFF',
position: 'relative',
top: '30px',
left: '-207px',
fontSize: '18px',
fontWeight: 'bold',
borderRadius: '8px',
padding: '8px 16px',
border: 'none'
}}>Click here </button></div>
      
      </Link>
    </div>
    </div> 
  </div>
)
}

export default Rating














// return (
//   <div className='rate_main'>
//     <div className='rate_submain'>
//      <div className='rate_movie'>
//       <img className='rate_image' src={posters[movieName]} alt='nothing'></img>
//      </div>
//      <div style={{marginTop:'485px',marginLeft:'-331px'}}>
//      <Link to='/Theatredetails'> <button className='rate_button'><b>Book Ticket</b></button></Link>
//      </div>
//     </div> 
//     <div className='rate_sec'>
//      <div  className='rate_score'>
//          <h1>Predicted Rating</h1>
//      </div>

//      <div>
//     <h1>Movie Name: {movieName}</h1>
//     <b>Genre:</b>{movieGenre}
//     {/* <p><h3>Director:</h3><span>{movieDir}</span></p> */}
//     <p><b >Director:</b>{movieDir}</p>

//   </div>
//      <div  className='rate_score'>
//        <h1>your score:  </h1>
//        <input type="text" ></input>
//     </div>
//     <div   className='rate_score'>
//       <h1>synopsis</h1>
//       <div>{movieDesc}</div>
//     </div>
//     <div   className='rate_score1'>
//       <h1>user ratings</h1>
//       <Link to='/Userreview'>
//       <button className='rate_rev'>Click here &gt;</button>
//       </Link>
//     </div>
//     </div> 
//   </div>
// )
// }