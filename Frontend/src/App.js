import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './User/page/Home'
import Signin from './Sign/signin/Sign'
import Signup from './Sign/signup/Signup'
import Theatres from './User/page/Theatres'
import Rate from './User/page/Rate'
import Review from './User/page/Reviews'
import Booking from './User/page/Tseat'
import Random from './User/User_comp/Random'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route  path="/" element={<Home/>}></Route>
      {/* <Route  path="/" element={<Random/>}></Route> */}
      <Route  path="/Signin" element={<Signin/>}></Route>
      <Route  path="/Random" element={<Random/>}></Route>
      <Route  path="/Signup" element={<Signup/>}></Route>
      <Route  path="/Theatredetails" element={<Theatres/>}></Route>
      <Route  path="/Ratings" element={<Rate/>}></Route>
      <Route path='/Userreview' element={<Review/>} ></Route>
      <Route path='/Ticketbooking' element={<Booking/>}></Route>
      <Route path="/home" element={<Home />} />

    </Routes>
    </BrowserRouter>
    
  );
  // return (
  //   <div className="App">
  //   <Signup />
  //   </div>
  // );
}

export default App;



// function App() {
//   return (
//     <BrowserRouter>
//     <Routes>
//       {/* <Route  path="/" element={<Home/>}></Route> */}
//       <Route  path="/Signin" element={<Signin/>}></Route>
//       <Route  path="/Signup" element={<Signup/>}></Route>
//       {/* <Route  path="/Theatredetails" element={<Theatres/>}></Route> */}
//       {/* <Route  path="/Ratings" element={<Rate/>}></Route> */}
//       <Route path='/Userreview' element={<Review/>} ></Route>
//       <Route path='/Ticketbooking' element={<Booking/>}></Route>
//     </Routes>
//     <Router>
//       <Switch>
//         <Route exact path="/" component={Home} />
//         <Route exact path="/Ratings" component={Rate} />
//         <Route exact path="/Theaterdetails" component={Theatres} />
//       </Switch>
//     </Router>
//     </BrowserRouter>
    
//   );
//   // return (
//   //   <div className="App">
//   //   <Signup />
//   //   </div>
//   // );
// }

// export default App;
