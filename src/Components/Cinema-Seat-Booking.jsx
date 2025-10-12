import React, { useMemo, useState } from 'react'

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
    bookedSeats = [],
    currency = "₹",
    onBookingComplete = () => {},
    title = "YX-Cinemas",
    subtitle = "we are the best in cinemas.",

}) => {

  const getSeatType = () => {

  }

 // this function will only run when something change in this dependency [] array
  const initializeSeats = useMemo(() => {
     const seats = [];
     for (let row = 0; row < layout.rows; row++) { 
           const seatRow = [];
           const seatTypeInfo = getSeatType(row);

           for(let seat = 0; seat < layout.seatsPerRow; seat++) {
                 const seatId = `${String.fromCharCode(65 + row)} ${seat + 1}`;

                 seatRow.push({
                  id: seatId,
                  row,
                  seat,
                  type: seatTypeInfo?.type || "regular",
                  price: seatTypeInfo?.price || 150,
                  color: seatTypeInfo?.color || "blue",
                  status: bookedSeats.includes(seatId) ? "booked" : "available",
                  selected: false,
                 });
           }
           seats.push(seatRow);
     }
     return seats;

  }, [layout, seatTypes, bookedSeats]);

  const [seats, setSeats] = useState(initializeSeats);


  const renderSeatSection = (seatRow, startIndex, endIndex) => {
    return (
        <div className="render-seat-d">
            {seatRow.slice(startIndex, endIndex).map((seat, index) => {
               return( 
                <div className="default-seat"> 
                    {startIndex + index + 1}
                </div>
               );
            })}
        </div>
    ); 
    
  };

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
        <div className="seats-map-d">
           <div className="seats-container">
               {
                  seats.map((row, rowIndex) => {
                     return (
                       <div className="seats-rows" key={rowIndex}>
                          <span>{String.fromCharCode(65 + rowIndex)}</span>
                          {renderSeatSection(row, 0, layout.aislePosition )}
                          {/* aisle */}
                          {renderSeatSection(
                            row, 
                            layout.aislePosition,
                            layout.seatsPerRow
                          )}
                       </div>
                     )
                  })
               }
           </div>
        </div>
        {/* legend */}
        {/* summery */}
        {/* booking btn */}
    </div>
  )
}

export default CinemaSeatBooking