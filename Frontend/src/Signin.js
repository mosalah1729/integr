import React from 'react'
import './css/Signin.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';




// import React from 'react'
import Seating from '../User_comp/Seating'

import { getCookie } from './utils';

const [formData, setFormData] = useState({ myData: 'hey' });
const [response, setResponse] = useState('');

const handleSubmit = (event) => {
event.preventDefault();
console.log(formData); // Debugging line
axios.post('/sign_in/', formData)
  .then(response => setResponse(response.data.status))
  .catch(error => console.error(error));
};

const handleInputChange = (event) => {
const { name, value } = event.target;
setFormData({ ...formData, [name]: value });
};


function signup() {
  return (
    <div className='main'>
    <div className='sub-main'>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Sign in</h1>
          <div className='email'>
            <label><b></b></label>
            <input type='email'  placeholder='Email' required className='input' id="email" name="email" value={formData.email} onChange={handleInputChange}></input>
            
          </div>
          <div className='pass'>
            <label><b></b></label>
            <input type='password' placeholder='Password' required className='input'id="pass" name="pass" value={formData.pass} onChange={handleInputChange}></input>
          </div>
          <div >
            <button type="submit" className='login-button'>Log in</button>
          </div>
          {response && <p>{response}</p>}
          <div>
         <p className="link">
          <b> Don't have an account yet?</b><a href='nothing'>Register now</a> 
         </p>
      </div>
        </div>
      </form>
    </div>
  </div>     
  )
}

export default signup
