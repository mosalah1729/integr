import React from 'react'
import '../User_comp/css/Banner.css'
import Upcoming from './Upcoming'
import Nowshow from './Nowshow'
import {Link} from 'react-router-dom'

// function Banner() {
//   return (
//     <div className='Banner'>
//       <div className='select'>
//         <button className='buttons'>Now showing</button>
//         <button className='buttons'>Coming soon</button>
//       </div>
//       <div className='lang'>
//       <h1>Language</h1>
//       </div>
//       <div className='movies'>
//       <h1 style={{marginLeft:'400px'}}>Movies in</h1>
      
//       <Nowshow/>
//       <Upcoming/>
//       </div>
//     </div>
//   )
// }

import { useState } from 'react';

function Banner(props) {

  const { userName } = props;

  const [showNowShowing, setShowNowShowing] = useState(true);

  const handleNowShowingClick = () => {
    setShowNowShowing(true);
  }

  const handleUpcomingClick = () => {
    setShowNowShowing(false);
  }

  const [selectedOption, setSelectedOption] = useState('');
  const [displayedOption, setDisplayedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setDisplayedOption(event.target.value);
    props.onSelect(event.target.value); // Call the onSelect function passed in as a prop with the selected value
  };
  console.log(selectedOption)

  return (
    <div className='Banner'>
      <Link to="/random">
            <button className="random">Ratings</button>
          </Link>
  <div className='select'>
    <button className='buttons' onClick={handleNowShowingClick}>Now showing</button>
    <button className='buttons' onClick={handleUpcomingClick}>Coming soon</button>
    <label htmlFor="simple-select-box"></label>
    <select id="simple-select-box" value={selectedOption} onChange={handleSelectChange} style={{ marginLeft: '19cm' }}>
      <option value="">Location</option>
      <option value="mananthavady">mananthavady </option>
      <option value="kozhikode">kozhikode </option>
      <option value="kochi">kochi </option>
    </select>
  </div>
  <div className='lang' style={{ display: 'block' }}>
  <h1 style={{ marginRight: '20px' }}>Language</h1>
<label style={{ marginRight: '20px' }}>
  <input type="radio" name="language" value="english" />
  English
</label>
<label style={{ marginRight: '20px' }}>
  <input type="radio" name="language" value="malayalam" />
  Malayalam
</label>
<label style={{ marginRight: '20px' }}>
  <input type="radio" name="language" value="hindi" />
  Hindi
</label>
<label style={{ marginRight: '20px' }}>
  <input type="radio" name="language" value="kannada" />
  Kannada
</label>
<label>
  <input type="radio" name="language" value="telugu" />
  Telugu
</label>
<div className='genres'>
  <h1>Genres</h1>
  <label>
    <input type="checkbox" name="genre" value="horror" />
    Horror
  </label>
  <label>
    <input type="checkbox" name="genre" value="action" />
    Action
  </label>
  <label>
    <input type="checkbox" name="genre" value="animation" />
    Animation
  </label>
  <label>
    <input type="checkbox" name="genre" value="adventure" />
    Adventure
  </label>
  <label>
    <input type="checkbox" name="genre" value="thriller" />
    Thriller
  </label>
</div>


</div>



  <div className='movies'>
    <h1 style={{marginLeft:'400px'}}>Movies in</h1>
    {showNowShowing ? <Nowshow movieLoc={selectedOption} userName={userName}/> : <Upcoming movieLoc={selectedOption} userName={userName}/>}
  </div>
</div>

  )
}

export default Banner
