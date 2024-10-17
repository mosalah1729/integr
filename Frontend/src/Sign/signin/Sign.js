import React, { useState } from 'react';
import '../signin/Sign.css';  // Ensure CSS file is correctly imported
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === `${name}=`) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function Sign(props) {
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
        console.log('return msg', response.data.status);
        window.location.href = `/?response=${response.data.status}`;
      })
      .catch((error) => console.error(error));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="main">
      <div className="sub-main">
        <form onSubmit={handleSubmit}>
          <h1>Sign in</h1>
          <div className="email">
            <label htmlFor="email"></label>
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
            <label htmlFor="pass"></label>
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
              <Link to="/Signup"> Register now</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Sign;
