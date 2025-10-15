import React from 'react'
import './App.css';
import CinemaSeatBooking from './Components/Cinema-Seat-Booking'

const App = () => {
  return (
    <div>
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
           bookedSeats={["C4", "B4"]}
      />
    </div>
  );
}

export default App