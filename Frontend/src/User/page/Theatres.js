import React from 'react'
import Header from '../User_head/User_head'
import Theatre from '../User_comp/Theatre'
function Theatres(props) {
  const {movieLoc}=props
  console.log('theatrsss', movieLoc)
  return (
    <div>
      <Header/>
      <Theatre movieLoc={movieLoc}/>
    </div>
  )
}

export default Theatres
