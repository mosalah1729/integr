// import React, { useState } from 'react';
// import './css/User_head.css'
// import Search from '../../Image/search.png'
// import {Link} from 'react-router-dom'
// import { useLocation } from 'react-router-dom';
// function User_head(props) {
//   const [selectedOption, setSelectedOption] = useState('');
//   const [displayedOption, setDisplayedOption] = useState('');
//   const location = useLocation();
//   const response = location.state?.response;
//   console.log('kittisign',response)


//   const handleSelectChange = (event) => {
//     setSelectedOption(event.target.value);
//     setDisplayedOption(event.target.value);
//     props.onSelect(event.target.value); // Call the onSelect function passed in as a prop with the selected value
//   };
//   return (
//     <div className='head'>
//       <div className='head_main'>
//       <div className='head_search'>
//       <input className='input_search' type="text" placeholder="Search..." />
//       <button className='button' type="submit"><img src={Search} alt='button' className='image' /></button>
//       </div>
//       </div>
//       {/* <div className='location'>
//       <label htmlFor="simple-select-box"></label>
//       <select id="simple-select-box" value={selectedOption} onChange={handleSelectChange}>
//         <option value="">Location</option>
//         <option value="mananthavady">mananthavady</option>
//         <option value="kozhikode">kozhikode</option>
//         <option value="kochi">kochi</option>
//       </select>
//       </div> */}
//       <div>
//       <Link to='/Signin' > <button  className='sign'>Sign</button></Link> 
//       </div>
//     </div>
//   )
// }

// export default User_head





// neww

import React, { useState } from 'react';
import './css/User_head.css';
import Search from '../../Image/search.png';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

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

function User_head(props) {
  const [userName, setUserName] = useState(props.userName);
  const location = useLocation();
  const response = location.state?.response;

  const handleSignOut = () => {
    axios
      .post('/sign_out/', { username: userName }, {
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
        },
      })
      .then((response) => {
        setUserName('');
        window.location.href = '/?response=';
        console.log('Sign out successful');
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="head">
      <div className="head_main">
        <div className='logo'>
        <img src="https://i.postimg.cc/JnfLCMCj/cineseer-transformed-removebg-preview.png" style={{ width: '235px', height: 'auto', margin: '10px', position: 'relative', top: '-25px', left: '0px' }} />
            </div>


        <div className="head_search">
          <input className="input_search" type="text" placeholder="Search..." />
          <button className="button" type="submit">
            <img src="https://www.freeiconspng.com/uploads/search-icon-png-21.png" alt="button" className="image" />
           
          </button>
        </div>
      </div>
      
      {userName ? (
        <div className="user-info" >
        <span className="greet" style={{ fontSize: '20px', color: 'aliceblue' }}>Hi, {userName}</span>
        <Link to="/random">
            <button className="random" style={{ margin: 0 }}>Ratings</button>
        </Link>
        <button className="sign" onClick={handleSignOut} style={{ margin: 0 }}>Sign Out</button>
    </div>
      ) : (
        <div className="user-info">
          
          <Link to="/Signin">
            <button className="sign">Sign In</button>
          </Link>

        </div>
      )}
      
    </div>
  );
  
}

export default User_head;







// import React, { useState } from 'react';
// import './css/User_head.css';
// import Search from '../../Image/search.png';
// import { Link } from 'react-router-dom';

// function Header(props) {
//   const [selectedOption, setSelectedOption] = useState('');
//   const [displayedOption, setDisplayedOption] = useState('');

//   const handleSelectChange = (event) => {
//     setSelectedOption(event.target.value);
//     setDisplayedOption(event.target.value);
//     props.onSelect(event.target.value); // Call the onSelect function passed in as a prop with the selected value
//   };

//   return (
//     <div className="head">
//       <div className="head_main">
//         <div className="head_search">
//           <input className="input_search" type="text" placeholder="Search..." />
//           <button className="button" type="submit">
//             <img src={Search} alt="button" className="image" />
//           </button>
//         </div>
//       </div>
//       <div className="location">
//         <label htmlFor="simple-select-box">Select a location:</label>
//         <select id="simple-select-box" value={selectedOption} onChange={handleSelectChange}>
//           <option value="">Location</option>
//           <option value="mananthavady">Mananthavady</option>
//           <option value="kozhikode">Kozhikode</option>
//           <option value="kochi">Kochi</option>
//         </select>
//       </div>
//       <div>
//         <Link to="/Signin">
//           <button className="sign">Sign In</button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Header;
