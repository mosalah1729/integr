import React from 'react'
import Header from '../User_head/User_head'
import Banner from '../User_comp/Banner'
import { useLocation } from 'react-router-dom';
function Home() {
   
  // const location = useLocation();
  // // const searchParams = new URLSearchParams(location.search);
  // // const response = searchParams.get('response');
  // const response = location.state?.response;
  // // console.log('response', response);
  // console.log('kitti home',response)

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const response = params.get('response');
  console.log('home msg',response)

  return (
    <div>
      <Header userName={response}/>
      <Banner userName={response}/>
    </div>
  )
}

export default Home
