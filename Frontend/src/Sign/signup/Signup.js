import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../signup/Signup.css';

function Signup() {
  const [formData, setFormData] = useState({ email: '', pass1: '', pass2: '' });
  const [response, setResponse] = useState('');
  const navigate = useNavigate();  // For navigating back

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/sign_up/', formData)
      .then(response => {
        setResponse(response.data.status);
        if (response.data.status === "user created!") {
          navigate(-1);  // Go back to the previous page
        }
      })
      .catch(error => console.error(error));
      
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className='mains'>
      <div className='sub-mains'>
        <form onSubmit={handleSubmit}>
          <div>
            <h1>Sign up</h1>
            <div className='email'>
              <label><b></b></label>
              <input type='email' required className='input' placeholder="Email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className='pass'>
              <label><b></b></label>
              <input type='password' required className='input' placeholder="Password" id="pass1" name="pass1" value={formData.pass1} onChange={handleInputChange} />
            </div>
            <div className='pass'>
              <label><b></b></label>
              <input type='password' required className='input' placeholder="Re-enter password" id="pass2" name="pass2" value={formData.pass2} onChange={handleInputChange} />
            </div>
            <div>
              <button type="submit" className='login-button'>Sign up</button>
            </div>
            {response && <p style={{ color: 'white', fontWeight: 'bold' }}>{response}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
