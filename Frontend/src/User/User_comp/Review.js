import React, { useState, useEffect } from 'react';

import './css/Review.css';
import Comment from './comment';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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


function Review() {

  const location = useLocation();
const movieName = location.state?.movieName;
const userName = location.state?.userName;



const [formData, setFormData] = useState({ score: '', review: '', movieName: movieName, userName: userName });
const [response, setResponse] = useState('');

const handleSubmit = (event) => {
  event.preventDefault();
  axios
    .post('/articles/submit_review/', JSON.stringify(formData), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      setResponse(response.data.status);
      console.log('reviewreturn',response.data.status)
      // window.location.href = `/?response=${response.data.status}`;
      // navigate(-1, { state: { response: response.data.status } });
    })
    .catch((error) => console.error(error));
    // const response = 'failure'; // replace with actual response data

  // navigate back to previous page with response data as query parameter
};

  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  

  // const { movieName } = props;
  const [movie, setMovies] = useState([]);
  const [pos, setPos] = useState([]);
  const [mix, setMix] = useState([]);
  const [neg, setNeg] = useState([]);
  const [avg, setAvg] = useState([]);
  const [count, setCount] = useState([]);
  
  
  useEffect(() => {
    const csrftoken = getCookie('csrftoken');

    fetch('/articles/reviewsort/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify({
        movieName: movieName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.review);
        setAvg(data.average)
        setCount(data.count)
        setPos(data.pos)
        setMix(data.mix)
        setNeg(data.neg)
        console.log('Success:', data);
        console.log('average', avg);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [movieName]);



  return (
    <div className='review'>
      <div className='rev_rate'>
        <div>
          <h3 style={{marginTop: '0px',marginLeft:'250px'}}>USER REVIEWS</h3>
          <div style={{ display: 'block' }}>
            <h1>{movieName}</h1>
          </div>
        </div>
        <div className='rev_score'>
          <div style={{background:'transparent'}}>
            <div className='score'><span className='rev_span'> {avg}</span></div>
            <label className='rev_label'>Based on {count}<br></br>Ratings</label>
          </div>
          <div style={{background:'transparent'}}>
            <div className='rev_color' style={{background:'#66CC33'}}></div>
            <span className='rev_colspan'>Positive:<b>{pos}</b></span>
            <div className='rev_color' style={{background:'#FFCC33'}}></div>
            <span className='rev_colspan'>Mixed:<b>{mix}</b></span>
            <div className='rev_color' style={{background:'#FF0000'}}></div>
            <span className='rev_colspan'>Negative:<b>{neg}</b></span>
          </div>
        </div>
      </div>
      <div className='rev_review'>
        <div className='a'>
          <h2 style={{marginTop: '10px',marginLeft: '15px'}}>Review this movie</h2>
        </div>
        <div className='b'>
          <form onSubmit={handleSubmit}>
            <div className='b_score'>
              <label>Enter your score:</label>
              <input type='number' name='score' onChange={handleInputChange} style={{height:'60px', width:'70px',borderRadius:'20px'}}></input>
              {/* {errors.score && <span>This field is required</span>} */}
            </div>
            <div>
            {/* <input type='text' name='review' onChange={handleInputChange} className='b_enter' style={{ display: 'none' }} value={movieName}></input> */}
            <input type='text' name='review' onChange={handleInputChange} className='b_enter'  ></input>
            {/* value={userName} */}
              {/* {errors.review && <span>This field is required</span>} */}
            </div>
            <div>
              <button className='rev_button' type='submit'>Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div className='rev_review'>
        <div className='a'>
          <h2 style={{marginTop: '10px',marginLeft: '15px'}}>User score</h2>
        </div>
        <div className='rev_see'>
          <Comment movieName={movieName} movie={movie} />
        </div>
      </div>
    </div>
  );
}

export default Review;



// idh update akyedh aan molithedh,
// import React from 'react'
// import './css/Review.css'
// import Comment from './comment'
// import ReviewForm from './Reviewform'

// import { useLocation } from 'react-router-dom';


// function Review() {
//   const location = useLocation();
//   const movieName = location.state?.movieName;
//   const userName = location.state?.userName;

  
    // const onSubmit = (data) => {
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(data)
  //   };
  //   fetch('/articles/submit_review/', requestOptions)
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data.success) {
  //         console.log('successfully submitted')
  //       } else {
  //         // Error submitting review
  //         console.log('error submitted')
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error submitting review:', error);
  //     });
  // };
 


//   return (
//     <div className='review'>
//       <div className='rev_rate'>
//         <div>
//           <h3 style={{marginTop: '0px',marginLeft:'250px'}}>USER REVIEWS</h3>
//           <div style={{ display: 'block' }}>
//             <h1>{movieName}</h1>
//           </div>
//         </div>
//         <div className='rev_score'>
//           <div style={{background:'transparent'}}>
//             <div className='score'><span className='rev_span'> 85</span></div>
//             <label className='rev_label'>Based on <br></br>Ratings</label>
//           </div>
//           <div style={{background:'transparent'}}>
//             <div className='rev_color' style={{background:'#66CC33'}}></div>
//             <span className='rev_colspan'>Positive:<b>14000</b></span>
//             <div className='rev_color' style={{background:'#FFCC33'}}></div>
//             <span className='rev_colspan'>Mixed:<b>15,234</b></span>
//             <div className='rev_color' style={{background:'#FF0000'}}></div>
//             <span className='rev_colspan'>Negative:<b>2,344</b></span>
//           </div>
//         </div>
//       </div>
//       <div className='rev_review'>
//         <div className='a'>
//           <h2 style={{marginTop: '10px',marginLeft: '15px'}}>Review this movie</h2>
//         </div>
//         <div className='b'>
//           <ReviewForm movieName={movieName} userName={userName} />
//         </div>
//       </div>
//       <div className='rev_review'>
//         <div className='a'>
//           <h2 style={{marginTop: '10px',marginLeft: '15px'}}>User score</h2>
//         </div>
//         <div className='rev_see'>
//           <Comment/>
//         </div>
//       </div>
//     </div>
//   );
// }


// export default Review






// function Review() {
  
//   const location = useLocation();

//   const movieName = location.state?.movieName;
//   const userName = location.state?.userName;
    
//   return (
//     <div className='review'>
//     <div className='rev_rate'>
//    <div> <h3 style={{marginTop: '0px',marginLeft:'250px'}}>USER REVIEWS</h3><div style={{ display: 'block' }}>
//     <h1>{movieName}</h1>
//   </div></div>
   
//     <div className='rev_score'>
//     <div style={{background:'transparent'}}>
//     <div className='score'><span className='rev_span'> 85</span></div> <label className='rev_label'>Based on <br></br>Ratings</label>
//     </div>
//     <div style={{background:'transparent'}}>
//       <div className='rev_color' style={{background:'#66CC33'}}></div><span className='rev_colspan'>Positive:<b>14000</b></span>
//       <div className='rev_color' style={{background:'#FFCC33'}}></div><span className='rev_colspan'>Mixed:<b>15,234</b></span>
//       <div className='rev_color' style={{background:'#FF0000'}}></div><span className='rev_colspan'>Negative:<b>2,344</b></span>
//     </div>
//     </div>
//     </div>
//     <div className='rev_review'>
//      <div className='a'>
//       <h2 style={{marginTop: '10px',marginLeft: '15px'}}>Review this movie</h2>
//      </div>
//      <div className='b'>
//       <form>
//         <div className='b_score'>
//             <label>Enter your score:</label>
//             <input type='number' size={2} required style={{height:'60px', width:'70px',borderRadius:'20px'}}></input>
//         </div>
//         <div >
//          <input type='text' className='b_enter'></input>
//         </div>
//         <div>
//             <button className='rev_button'>Submit</button>
//         </div>
//       </form>
//      </div>
//     </div>
//     <div className='rev_review'>
//      <div className='a'>
//       <h2 style={{marginTop: '10px',marginLeft: '15px'}}>User score</h2>
//      </div>
//      <div className='rev_see'>
//      <Comment/>
//      </div>
//     </div>
//     </div>
//   )
// }

// export default Review



