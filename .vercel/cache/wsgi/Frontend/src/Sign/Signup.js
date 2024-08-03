// import React from 'react'
import '../Sign/css/Signup.css'
// import React from 'react'
import './css/Signin.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';




// import React from 'react'
// import Seating from '../User_comp/Seating'

// import { getCookie } from './utils';




function Signup() {

const [formData, setFormData] = useState({ email: '',pass1: '' ,pass2:''});
const [response, setResponse] = useState('');

const handleSubmit = (event) => {
event.preventDefault();
// console.log(formData); // Debugging line
axios.post('/sign_up/', formData)
  .then(response => setResponse(response.data.status))
  .catch(error => console.error(error));
};

const handleInputChange = (event) => {
const { name, value } = event.target;
setFormData({ ...formData, [name]: value });
};


  return (
    <div className='main'>
    <div className='sub-main'>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Sign up</h1>
          <div className='email'>
            <label><b></b></label>
            <input type='email' required className='input' placeholder="Email" id="email" name="email" value={formData.email} onChange={handleInputChange}></input>
          </div>
          <div className='pass'>
            <label><b></b></label>
            <input type='password' required className='input'placeholder="Password" id="pass1" name="pass1" value={formData.pass1} onChange={handleInputChange}></input>
          </div>
          <div className='pass'>
            <label><b></b></label>
            <input type='password' required className='input'placeholder="Re-enter password" id="pass2" name="pass2" value={formData.pass2} onChange={handleInputChange}></input>
          </div>
          <div >
            <button type="submit" className='login-button'>Sign up</button>
          </div>
          {response && <p>{response}</p>}
        </div>
      </form>
    </div>
  </div>     
  )
}

export default Signup
