// // import React from 'react'
// import './css/Signin.css'
// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// // import {Link} from 'react-router-dom'
// // import { useHistory } from 'react-router';
// // import { useNavigate } from 'react-router-dom';
// import {Link,  useNavigate } from 'react-router-dom'
// // import { useHistory } from 'react-router';







// // import React from 'react'
// // import Seating from '../User_comp/Seating'

// // import { getCookie } from './utils';

// function getCookie(name) {
//   let cookieValue = null;
//   if (document.cookie && document.cookie !== '') {
//     const cookies = document.cookie.split(';');
//     for (let i = 0; i < cookies.length; i++) {
//       const cookie = cookies[i].trim();
//       // Does this cookie string begin with the name we want?
//       if (cookie.substring(0, name.length + 1) === (name + '=')) {
//         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//         break;
//       }
//     }
//   }
//   return cookieValue;
// }



// function Signin(props) {



//   const [state, setState] = useState('');


//   const [formData, setFormData] = useState({ myData: 'hey' });
//   const [response, setResponse] = useState('');
//   // const navigate = useNavigate(); 
//   const navigate = useNavigate(); 

  
//   const handleSubmit = (event) => {
//   event.preventDefault();
//   console.log(formData); // Debugging line
//   axios.post('/sign_in/', formData, {
//     headers: {
//       'X-CSRFToken': getCookie('csrftoken') // getCookie() is a function that retrieves the value of the csrftoken cookie
//     }
//   })
//   // ('/sign_in/', formData)
//   .then((response) => {
//     setResponse(response.data.status);
//     // navigate(-1); // go back to the previous page
//     console.log('ready',response.data.status)
//     navigate(-1, { state: { response: response.data.status } });
//     // navigate(-1, state={{ response: response.data.status}});
//     // state={{  movName : mov.name,movGenre: mov.genre,movLang: mov.lang,}}>


//   })
//     .catch(error => console.error(error));
//   };
  
//   const handleInputChange = (event) => {
//   const { name, value } = event.target;
//   setFormData({ ...formData, [name]: value });
//   };
  





//   return (
//     <div className='main'>
//     <div className='sub-main'>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <h1>Sign in</h1>
//           <div className='email'>
//             <label><b></b></label>
//             <input type='email'  placeholder='Email' required className='input' id="email" name="email" value={formData.email} onChange={handleInputChange}></input>
            
//           </div>
//           <div className='pass'>
//             <label><b></b></label>
//             <input type='password' placeholder='Password' required className='input'id="pass" name="pass" value={formData.pass} onChange={handleInputChange}></input>
//           </div>
//           <div >
//             <button type="submit" className='login-button'>Log in</button>
//           </div>
//           {response && <p>{response}</p>}
//           <div>
//          <p className="link">
//           <b> Don't have an account yet?</b><Link to='/Signup'>Register now</Link> 
//          </p>
//       </div>
//         </div>
//       </form>
//     </div>
//   </div>     
//   )
// }

// export default Signin







// neww

import React, { useState } from 'react';
import './css/Signin.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === `${name}=`) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function Signin(props) {
  const [formData, setFormData] = useState({ email: '', pass: '' });
  const [response, setResponse] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('/sign_in/', formData, {
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
        },
      })
      .then((response) => {
        setResponse(response.data.status);
        console.log('return msg',response.data.status)
        window.location.href = `/?response=${response.data.status}`;
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

  return (
    <div className="main">
      <div className="sub-main">
        <form onSubmit={handleSubmit}>
          <div>
            <h1>Sign in</h1>
            <div className="email">
              <label htmlFor="email">
                <b>Email</b>
              </label>
              <input
                type="email"
                placeholder="Email"
                required
                className="input"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="pass">
              <label htmlFor="pass">
                <b>Password</b>
              </label>
              <input
                type="password"
                placeholder="Password"
                required
                className="input"
                id="pass"
                name="pass"
                value={formData.pass}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <button type="submit" className="login-button">
                Log in
              </button>
            </div>
            {response && <p>{response}</p>}
            <div>
              <p className="link">
                <b>Don't have an account yet?</b>
                <Link to="/Signup">Register now</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
