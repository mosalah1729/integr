import React from 'react'
import Moviehead from '../User_head/Moviehead'
import Tseats from '../User_comp/Tseats'
import { useLocation } from 'react-router-dom';
function Tseat(props) {

  const location = useLocation();
  const movieName = location.state?.movieName;
  const selectedDate = location.state?.selectedDate;
  const movieLang = location.state?.movieLang;
  const startTime = location.state?.startTime;
  const screen = location.state?.screen;
  const theater = location.state?.theater;
  const userName = location.state?.userName;
  const capacity = location.state?.capacity;

  
  
  // const movieLocation = location.state?.selectedOption;


  
  React.useEffect(() => {
    console.log('location from', location);
    console.log('movie name:', movieName);
    console.log('movie selectedDate:', selectedDate);
    console.log('movie movieLang:', movieLang);
  }, [location, movieName,selectedDate,movieLang]);
  return (
    <div>
      <Moviehead movieName={movieName} selectedDate={selectedDate}  movieLang={movieLang} theater={theater} screen={screen} startTime={startTime}/>
      <Tseats capacity={capacity} movieName={movieName} selectedDate={selectedDate}  movieLang={movieLang} theater={theater} screen={screen} startTime={startTime}userName={userName}/>
    </div>
  )
}

export default Tseat
