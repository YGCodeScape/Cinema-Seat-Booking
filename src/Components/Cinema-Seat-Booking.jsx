import React from 'react'

const CinemaSeatBooking = ( {
    layout = {
        rows : 8,
        seatsPerRow : 12,
        aislePosition: 5,
    },
    seatTypes = {
        regular: {name: "Regular", Price: 150, rows: [0,1,2] },
        premium: {name: "Premium", Price: 250, rows: [3,4,5] },
        vip : {name: "VIP", Price: 350, rows: [6,7,8] },
    },
    bookedSeat = [],
    currency = "₹",
    onBookingComplete = () => {},
    title = "YX-Cinemas",
    subtitle = "we are the best in cinemas.",

}) => {
  return (
    <div className="container-div">
        {/* title */}
       <div className="title-d">
           <h1>{title}</h1>
           <p>{subtitle}</p>
        </div>
        
        {/* screen */}
        <div className="screen-d">
           <div className="screen"></div>
           <span>screen</span>
        </div>
        {/* seats map */}
        {/* legend */}
        {/* summery */}
        {/* booking btn */}
    </div>
  )
}

export default CinemaSeatBooking