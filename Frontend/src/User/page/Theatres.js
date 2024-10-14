import React from 'react'
import Header from '../User_head/User_head'
import Theatre from '../User_comp/Theatre'
import { useLocation } from 'react-router-dom';


function Theatres() {
  const location = useLocation();
const movieLoc = location.state?.movieLoc;
const userName = location.state?.userName;
console.log('theatress', movieLoc);
  return (
    <div>
      <Header/>
      <Theatre movieLoc={movieLoc} userName={userName}/>
    </div>
  )
}

export default Theatres
