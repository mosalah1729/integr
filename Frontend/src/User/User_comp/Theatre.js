// import { getArticles } from './api.js';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import spiderverse from '../../Image/cover/sp.jpeg'
import blade from '../../Image/cover/jw.jpeg'
import shazam from '../../Image/cover/shzm.jpeg'
// import evildead from '../../Image/shazam.jpg'
import johnwick from '../../Image/cover/jw.jpeg'
import jaws from '../../Image/cover/jaws.jpeg'
import christopher from '../../Image/cover/christ.jpeg'
import avatar from '../../Image/cover/avatarcover.jpeg'
import evildead from '../../Image/ed2.jpeg'
import batman from '../../Image/cover/bt.jpeg'





// import React from 'react'
import './css/Theatre.css'
import Seating from '../User_comp/Seating'

import { getCookie } from './utils';

const csrfToken = getCookie('csrftoken');

axios.defaults.headers.common['X-CSRFToken'] = csrfToken;




function Theatre(props) {

  
  // const { movName } = props.location.state;
  // const { params } = props.match;
  // const { movName: urlMovName } = params;


  // const { selectedOption, movieName } = props.location.state;
 
 
 
  // right one
  // const location = useLocation();
  // const movieName = location.state?.movName;
  // const movieLocation = location.state?.selectedOption;

  const { movieLoc } = props;
 
  const location = useLocation();
  const movieName = location.state?.movName;
  const movieGenre = location.state?.movGenre;
  const movieLang = location.state?.movLang;
  const userName = location.state?.userName;
  // const movieLoc = location.state?.selectedOption;


  
  React.useEffect(() => {
    console.log('location from', location,movieLoc);
    console.log('movie name:', movieName);
    console.log('movie genre:', movieGenre);
    console.log('userr:', userName);
  }, [location, movieName]);

  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  // const movieLoc="mananthavady"
  
  useEffect(() => {
    const today = new Date();
    const options = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      options.push(date.toISOString().slice(0, 10));
    }
    setDates(options);
  }, []);


  const handleSelectChange = (event) => {
    setSelectedDate(event.target.value);
  };




  
  const [abc, setText] = useState('');
  
    useEffect(() => {
      fetch('/my_view/')
        .then(response => response.json())
        .then(data => setText(data.text));
    }, []);
  
   

    const [data, setAbcd] = useState({});

    useEffect(() => {
      axios.get('/get_text/')
        .then(response => setAbcd(response.data))
        .catch(error => console.error(error));
    }, []);


  
    const [formData, setFormData] = useState({ myData: 'hey' });
    const [response, setResponse] = useState('');

   const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // Debugging line
    axios.post('/my_api_endpoint/', formData)
      .then(response => setResponse(response.data.status))
      .catch(error => console.error(error));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
   
  const posters = { shazam: shazam, blade: blade, spiderverse: spiderverse,'evil dead':evildead ,'john wick 4':johnwick,'jaws':jaws,'christopher':christopher,'avatar':avatar,batman:batman};
  
  console.log('dateyback',selectedDate)

  return (
    
    <div className='thea_main'>
    <div className='thea_movie' style={{backgroundImage: `url(${posters[movieName]})`}} >
      
    <div style={{margin:'85px 35px'}}>
  <h1 style={{fontSize:'50px', margin: 0}}>{movieName}</h1>
  <p className='thea_details' style={{fontSize: '25px', margin: 0}}>{movieGenre}.{movieLang}</p>
</div>

     {/* <div>{movieLocation}</div> */}
    </div>
    {/* <div>
        <p>Name: {data.name}</p>
        <p>Age: {data.age}</p>
        <p>Email: {data.email}</p>
    </div> */}
    <form onSubmit={handleSubmit}>
    <div className='thea_date'>
    <select value={selectedDate} onChange={handleSelectChange}>
    <option value="">Date</option>
      {dates.map((date) => (
        <option key={date} value={date}>
          {date} 
        </option>
      ))}
    </select>
    </div>
    
      {/* <label htmlFor="myData">Enter your name:</label>
      <input type="text" id="myData" name="myData" value={formData.myData} onChange={handleInputChange} />
      <button type="submit">Submit</button>
      {response && <p>{response}</p>} */}
    </form>
    {/* <div>{abc}</div> */}
    <div className='thea_seat'>
    {selectedDate}

    <Seating movieName={movieName} selectedDate={selectedDate}  movieLoc={movieLoc} movieLang={movieLang} userName={userName} />

    </div>
    </div>
  )
}
export default Theatre


    // const [formData, setFormData] = useState({ myData: '' });
    // const [status, setStatus] = useState(null);
  
    // const handleSubmit = (event) => {
    //   event.preventDefault();
    //   axios.post('/my_api_endpoint/', formData)
    //     .then(response => setStatus(response.data.status))
    //     .catch(error => console.error(error));
    // };
  
    // const handleInputChange = (event) => {
    //   const { name, value } = event.target;
    //   setFormData({ ...formData, [name]: value });
    // };










    // function Theatre() {
//   const [text, setText] = useState('');

//   useEffect(() => {
//     fetch('/get_text/')
//       .then(response => response.json())
//       .then(data => setText(data.text));
//   }, []);

//   return <div>{text}</div>;
// }









// class ArticleList extends React.Component {
//   state = {
//     articles: [],
//   };
//   componentDidMount() {
//     getArticles()
//       .then((response) => {
//         this.setState({ articles: response.data });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
//   render() {
//     // Render your articles here
//   }
// }



// function ArticleList() {
//   const [articles, setArticles] = useState([]);

//   useEffect(() => {
//     axios.get('/article-list/')
//       .then(response => setArticles(response.data.articles))
//       .catch(error => console.error(error));
//   }, []);

//   return (
//     <div>
//       {articles.map(article => (
//         <div key={article.title}>
//           <h2>{article.title}</h2>
//           <p>By {article.author}</p>
//           <p>{article.content}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
