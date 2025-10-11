import React from 'react'
import CinemaSeatBooking from './Components/Cinema-Seat-Booking'


const App = () => {
  return (
      <CinemaSeatBooking 
           layout = {{
             rows : 8,
             seatsPerRow : 12,
             aislePosition: 5,
           }}
           seatTypes = {{
             regular: {name: "Regular", Price: 150, rows: [0,1,2] },
             premium: {name: "Premium", Price: 250, rows: [3,4,5] },
             vip : {name: "VIP", Price: 350, rows: [6,7,8] },
           }}
      />
  );
}

export default App