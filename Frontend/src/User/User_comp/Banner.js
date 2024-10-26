import React, { useState } from 'react';
import '../User_comp/css/Banner.css';
import Upcoming from './Upcoming';
import Nowshow from './Nowshow';
import { Link } from 'react-router-dom';

function Banner(props) {
  const { userName } = props;
  const [showNowShowing, setShowNowShowing] = useState(true);
  const [selectedOption, setSelectedOption] = useState('mananthavady');
  const [displayedOption, setDisplayedOption] = useState('mananthavady');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleNowShowingClick = () => {
    setShowNowShowing(true);
  };

  const handleUpcomingClick = () => {
    setShowNowShowing(false);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setDisplayedOption(event.target.value);
    props.onSelect(event.target.value); // Call the onSelect function passed in as a prop with the selected value
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleGenreChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedGenres([...selectedGenres, value]);
    } else {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== value));
    }
  };

  console.log(selectedOption);
  console.log(selectedLanguage);
  console.log(selectedGenres);

  return (
    <div className='Banner'>
      <div className='select'>
        <button className='buttons' onClick={handleNowShowingClick}>Now showing</button>
        <button className='buttons' onClick={handleUpcomingClick}>Coming soon</button>
        <label htmlFor="simple-select-box"></label>
        <select
          id="simple-select-box"
          value={selectedOption}
          onChange={handleSelectChange}
          style={{
            marginLeft: '1275px',
            marginTop: '-12px',
            paddingTop: '6px', // Slightly smaller padding
            borderRadius: '6px', // Smaller rounded corners
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', // Gradient background
            border: 'none', // Remove default border
            color: '#000', // Black text color
            fontSize: '14px', // Slightly smaller font size
            outline: 'none', // Remove outline when focused
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)', // Slightly reduced shadow
            transition: 'all 0.3s ease', // Smooth transition
            cursor: 'pointer', // Change cursor to pointer on hover
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          <option value="">Location</option>
          <option value="mananthavady">Mananthavady</option>
          <option value="kozhikode">Kozhikode</option>
          <option value="kochi">Kochi</option>
        </select>
      </div>

      <div className='lang' style={{ display: 'block' }}>
        <h1 style={{marginLeft: '21px' }}>Language</h1>
        <label style={{ marginRight: '20px' }}>
          <input type="radio" name="language" value="english" onChange={handleLanguageChange} />
          English
        </label>
        <label style={{ marginRight: '20px' }}>
          <input type="radio" name="language" value="malayalam" onChange={handleLanguageChange} />
          Malayalam
        </label>
        <label style={{ marginRight: '20px' }}>
          <input type="radio" name="language" value="hindi" onChange={handleLanguageChange} />
          Hindi
        </label>
        <label style={{ marginRight: '20px' }}>
          <input type="radio" name="language" value="kannada" onChange={handleLanguageChange} />
          Kannada
        </label>
        <label>
          <input type="radio" name="language" value="telugu" onChange={handleLanguageChange} />
          Telugu
        </label>

                <div className='genres'>
          <h1 style={{ marginLeft: '21px' }}>Genres</h1>
          <label>
            <input type="checkbox" name="genre" value="Horror" onChange={handleGenreChange} />
            Horror
          </label>
          <label>
            <input type="checkbox" name="genre" value="Action" onChange={handleGenreChange} />
            Action
          </label>
          <label>
            <input type="checkbox" name="genre" value="Animation" onChange={handleGenreChange} />
            Animation
          </label>
          <label>
            <input type="checkbox" name="genre" value="Adventure" onChange={handleGenreChange} />
            Adventure
          </label>
          <label>
            <input type="checkbox" name="genre" value="Thriller" onChange={handleGenreChange} />
            Thriller
          </label>
          <label>
            <input type="checkbox" name="genre" value="Comedy" onChange={handleGenreChange} />
            Comedy
          </label>
        </div>

      </div>

      <div className='movies'>
        <h1 style={{ marginLeft: '58px', fontFamily:'poppins' }}>Movies in <b style={{ color:'#4ad0ef' }}>{selectedOption}</b> </h1>
        {showNowShowing
          ? <Nowshow movieLoc={selectedOption} userName={userName} language={selectedLanguage} genres={selectedGenres} />
          : <Upcoming movieLoc={selectedOption} userName={userName} language={selectedLanguage} genres={selectedGenres} />
        }
      </div>
    </div>
  );
}

export default Banner;
