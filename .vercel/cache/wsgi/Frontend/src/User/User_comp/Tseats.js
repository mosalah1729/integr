import React, { useState , useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { loadRazorpay } from './utils';
// import { loadRazorpay } from 'razorpay';


function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}


function Seating(props) {

  const { movieName } = props;
  const { movieLang } = props;
  const { theater } = props;
  const { screen } = props;
  const { startTime } = props;
  const { selectedDate } = props;
  const { movieLoc } = props;
  const { userName } = props;
  const { capacity } = props;
  console.log('capa',capacity);
  console.log('screen',screen);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  // const occupiedSeats = useState([]);
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  const rows = 10;
  const cols = 10;
  const selectedCount = selectedSeats.length;
  const ticketPrice = 100;
  const totalPrice = selectedCount * ticketPrice;
  const csrftoken = getCookie('csrftoken');
  useEffect(() => {
    
    fetch('/articles/getseats/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify({
        movieName: movieName,
        theater: theater,
        screen: screen,
        startTime: startTime,
        selectedDate: selectedDate,
        capacity:capacity,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.seats)) {
          setOccupiedSeats(data.seats);
          // console.log(data.seats);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [movieName, theater, screen, startTime, selectedDate, csrftoken]);


  const handleSeatClick = (row, col) => {
    const seat = `${String.fromCharCode(65 + row)}${col + 1}`;
    if (!occupiedSeats.includes(seat)) {
      if (selectedSeats.includes(seat)) {
        setSelectedSeats(selectedSeats.filter((s) => s !== seat));
      } else {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  const handlePayment = async () => {
    const response = await loadRazorpay();
    if (!response) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }
    const data = await fetch('/articles/payment/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken'),
      },
      body: JSON.stringify({
        price: totalPrice,
      }),
    }).then((t) => t.json());
    console.log(data)
    const options = {
      key: 'rzp_test_eFtaril9zvyOGW',
      amount: data.amount,
      currency: data.currency,
      name: 'Movie Ticket Booking',
      description: 'Booking tickets for the latest movie',
      image: 'https://example.com/your_logo.png',
      order_id: data.id,
      handler: function (response) {
        const pay=response.razorpay_payment_id
        console.log("intheend",pay)
        // useEffect(() => {
          const csrftoken = getCookie('csrftoken');
      
          fetch('/articles/addbooking/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
              pay: pay,
              // showtime: "showtime",
              movieName :movieName,
              // movieLang :movieLang,
              theater:theater,
              screen :screen,
              startTime :startTime,
              selectedDate : selectedDate,
              price:data.amount,
              // movieLoc :movieLoc,
              user: userName,
              order: data.id,
              seats:selectedSeats,
              capacity:capacity,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        // }, );
        alert(`Payment successful. Payment ID: ${response.razorpay_payment_id}`);
        // Handle payment success here
      },
      prefill: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#F37254',
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };




  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f2f2f2' }}>
      <div style={{ padding: '20px' }}>
        <h1 style={{ textAlign: 'center' }}>Seating Chart</h1>
        <div>
          {Array.from({ length: rows }, (_, row) => (
            <div key={row} style={{ display: 'flex' }}>
              <div style={{ width: '20px', marginRight: '5px' }}>{String.fromCharCode(65 + row)}</div>
              {Array.from({ length: cols }, (_, col) => {
                const seat = `${String.fromCharCode(65 + row)}${col + 1}`;
                // console.log(seat)
                const isOccupied = occupiedSeats.includes(seat);
                const isSelected = selectedSeats.includes(seat);
                // console.log(isOccupied)
                // console.log(isSelected)
            
  
                return (
                  <div
                    key={`${row}-${col}`}
                    style={{
                      width: '30px',
                      height: '30px',
                      margin: '5px',
                      backgroundColor: isOccupied ? 'grey' : isSelected ? 'orange' : 'white',
                      cursor: isOccupied ? 'not-allowed' : 'pointer',
                      border: '1px solid orange',
                      borderRadius: '5px',
                      marginRight: col === 4 ? '10px' : '0px',
                    }}
                    onClick={() => handleSeatClick(row, col)}
                  />
                );
              })}
            </div>
          ))}
        </div>
        {selectedCount > 0 && (
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'white', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{ marginRight: '10px' }}>{selectedCount} seat{selectedCount > 1 ? 's' : ''} selected: {selectedSeats.join(', ')}</p>
            <button onClick={handlePayment}>Pay Rs.{totalPrice}</button>
          </div>
        )}
  
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <div style={{ width: '180px', height: '15px', margin: '5px', backgroundColor: 'grey' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <div style={{ width: '30px', height: '30px', margin: '5px', backgroundColor: 'white', border: '1px solid orange', borderRadius: '5px' }} />available
          <div style={{ width: '30px', height: '30px', margin: '5px', backgroundColor: 'orange', border: '1px solid orange', borderRadius: '5px' }} />selected
          <div style={{ width: '30px', height: '30px', margin: '5px', backgroundColor: 'grey', borderRadius: '5px' }} />sold
        </div>
      </div>
    </div>
  );
  









  // return occupiedSeats
  // return (
  //   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f2f2f2' }}>
  //     <div style={{ padding: '20px' }}>
  //       <h1 style={{ textAlign: 'center' }}>Seating Chart</h1>
  //       <div>
  //         {Array.from({ length: rows }, (_, row) => (
  //           <div key={row} style={{ display: 'flex' }}>
  //             <div style={{ width: '20px', marginRight: '5px' }}>{String.fromCharCode(65 + row)}</div>
  //             {Array.from({ length: cols }, (_, col) => (
  //               <div
  //                 key={`${row}-${col}`}
  //                 style={{
  //                   width: '30px',
  //                   height: '30px',
  //                   margin: '5px',
  //                   backgroundColor: selectedSeats.includes(`${String.fromCharCode(65 + row)}${col + 1}`) ? 'orange' : 'white',
  //                   cursor: 'pointer',
  //                   border: '1px solid orange',
  //                   borderRadius: '5px',
  //                   marginRight: col === 4 ? '10px' : '0px',
  //                 }}
  //                 onClick={() => handleSeatClick(row, col)}
  //               />
  //             ))}
  //           </div>
  //         ))}
  //       </div>
  //       {selectedCount > 0 && (
  //         <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'white', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  //           <p style={{ marginRight: '10px' }}>{selectedCount} seat{selectedCount > 1 ? 's' : ''} selected: {selectedSeats.join(', ')}</p>
  //           <button onClick={handlePayment}>Pay Rs.{totalPrice}</button>
  //         </div>
  //       )}

  //       <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
  //         <div style={{ width: '180px', height: '15px', margin: '5px', backgroundColor: 'grey' }} />
  //       </div>
  //       <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
  //         <div style={{ width: '30px', height: '30px', margin: '5px', backgroundColor: 'white', border: '1px solid orange', borderRadius: '5px' }} />available
  //         <div style={{ width: '30px', height: '30px', margin: '5px', backgroundColor: 'orange', border: '1px solid orange', borderRadius: '5px' }} />selected
  //         <div style={{ width: '30px', height: '30px', margin: '5px', backgroundColor: 'grey', borderRadius: '5px' }} />sold
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default Seating;


// function Seating() {
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const rows = 10;
//   const cols = 10;
//   const selectedCount = selectedSeats.length;
//   const ticketPrice = 100;
//   const totalPrice = selectedCount * ticketPrice;

//   const handleSeatClick = (row, col) => {
//     const seat = `${String.fromCharCode(65 + row)}${col + 1}`;
//     if (selectedSeats.includes(seat)) {
//       setSelectedSeats(selectedSeats.filter(s => s !== seat));
//     } else {
//       setSelectedSeats([...selectedSeats, seat]);
//     }
//   };

//   // const handleBookTickets = () => {
//   //   // Handle booking tickets here
//   //   alert(`Booked ${selectedCount} tickets: ${selectedSeats.join(', ')}\nTotal Price: $${totalPrice}`);
//   // };
//   const response=[]
//   const csrftoken = getCookie('csrftoken');
//   const handleBookTickets = async () => {
//   //   // const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    
//   //  fetch('/articles/payment/', {
//   //     method: 'POST',
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //       'X-CSRFToken': csrftoken,
//   //     },
//   //     body: JSON.stringify({
//   //       seats: selectedSeats,
//   //       price: totalPrice,
//   //     }),
//   //   });
//   //   console.log(response)
//   //   const data = await response.json();
//   //   if (response.ok) {
//   //     alert(`Booked ${selectedCount} tickets: ${selectedSeats.join(', ')}\nTotal Price: $${totalPrice}\nBooking ID: ${data.booking_id}`);
//   //   } else {
//   //     alert(`Error: ${data.message}`);
//   //   }
//   // };
  
//   fetch('/articles/payment/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'X-CSRFToken': csrftoken,
//     },
//     body: JSON.stringify({
//       seats: selectedSeats,
//       price: totalPrice,
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
     
//       console.log('Success:',data);
     
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
// };

  

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f2f2f2' }}>
//       <div style={{ padding: '20px' }}>
//         <h1 style={{ textAlign: 'center' }}>Seating Chart</h1>
//         <div>
//           {Array.from({ length: rows }, (_, row) => (
//             <div key={row} style={{ display: 'flex' }}>
//               <div style={{ width: '20px', marginRight: '5px' }}>{String.fromCharCode(65 + row)}</div>
//               {Array.from({ length: cols }, (_, col) => (
//                 <div
//                   key={`${row}-${col}`}
//                   style={{
//                     width: '30px',
//                     height: '30px',
//                     margin: '5px',
//                     backgroundColor: selectedSeats.includes(`${String.fromCharCode(65 + row)}${col + 1}`) ? 'orange' : 'white',
//                     cursor: 'pointer',
//                     border: '1px solid orange',
//                     borderRadius: '5px',
//                     marginRight: col === 4 ? '10px' : '0px',
//                   }}
//                   onClick={() => handleSeatClick(row, col)}
//                 />
//               ))}
//             </div>
//           ))}
//         </div>
//         {selectedCount > 0 && (
//           <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'white', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <p style={{ marginRight: '10px' }}>{selectedCount} seat{selectedCount > 1 ? 's' : ''} selected: {selectedSeats.join(', ')}</p>
//             <button onClick={handleBookTickets}>Pay Rs.{totalPrice}</button>
//           </div>
//         )}

//         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//           <div style={{ width: '180px', height: '15px', margin: '5px', backgroundColor: 'grey' }} />
//         </div>
//         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//           <div style={{ width: '30px', height: '30px', margin: '5px', backgroundColor: 'white', border: '1px solid orange', borderRadius: '5px' }} />available
//           <div style={{ width: '30px', height: '30px', margin: '5px', backgroundColor: 'orange', border: '1px solid orange', borderRadius: '5px' }} />selected
//           <div style={{ width: '30px', height: '30px', margin: '5px', backgroundColor: 'grey', borderRadius: '5px' }} />sold
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Seating;
