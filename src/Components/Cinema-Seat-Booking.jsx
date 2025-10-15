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

  const colors = [
    "red",
    "purple",
    "yellow",
    "blue",
    "gray",
    "pink",
  ];

  const getSeatType = (row) => {
     const seatTypeEntries = Object.entries(seatTypes);

     for(let i = 0; i < seatTypeEntries.length; i++ ) {
         const [type, config] = seatTypeEntries[i];
         if(config.rows.includes(row)) {
             const color  = colors[i % colors.length];
             return {type, color, ...config }
         }
     }
     const [firstType, firstConfig] = seatTypeEntries[0];
     return {type: firstType, color: colors[0], ...firstConfig };
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
                  price: seatTypeInfo?.Price || 150,
                  color: seatTypeInfo?.color || "blue",
                  status: bookedSeats.includes(seatId)? "booked" : "available",
                  selected: false,
                 });
           }
           seats.push(seatRow);
     }
     return seats;
  }, [layout, seatTypes, bookedSeats]);

  const [seats, setSeats] = useState(initializeSeats);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const getColorClass = (colorName) => {
    const colorMap = {
       blue: "bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200",
       purple: "bg-purple-100 border-purple-300 text-purple-800 hover:bg-purple-200 ",
       yellow: "bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200 ",
       green: "bg-green-100 border-green-300 text-green-800 hover:bg-green-200 ",
       red: "bg-red-100 border-red-300 text-red-800 hover:bg-red-200 ",
       indigo: "bg-indigo-100 border-indigo-300 text-indigo-800 hover:bg-indigo-200",
       pink: "bg-pink-100 border-pink-300 text-pink-800 hover:bg-pink-200 ",
       gray: "bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200 ",
    };
    return colorMap[colorName] || colorMap.blue;
  }

  const getSeatClassName = (seat) => {
     const baseClass = "w-8 h-8 sm:w-10 sm:h-10 rounded-t-lg border-2 border-blue-300 cursor-pointer transition-all duration-200 flex items-center justify-center text-xs sm:text-sm font-bold bg-blue-100 text-blue-800";

     if(seat.status === "booked") {
      return `${baseClass} bg-gray-400 border-gray-500 text-gray-600 cursor-not-allowed `;
     }
     if(seat.selected) {
      return `${baseClass} bg-green-500 border-green-600 text-white transform scale-110 `;
     }
     return `${baseClass} ${getColorClass(seat.color)} `;
  };

  const handleSeatClick = (rowIndex, seatIndex) => {};

  const renderSeatSection = (seatRow, startIndex, endIndex) => {
    return (
        <div className="flex">
            {seatRow.slice(startIndex, endIndex).map((seat, index) => {

               return <div id='seatbox'
                        className={getSeatClassName(seat)}
                        key={seat.id} title={`${seat.id} - ${
                          getSeatType(seat.row)?.name || "Regular"
                        } - ${currency}${seat.price} `}
                        onClick={() => handleSeatClick(seat.row, startIndex + index)}
                     >
                 {startIndex + index + 1}
               </div>;
            })}
        </div>
    ); 
  };

  const uniqueSeatTypes = Object.entries(seatTypes).map(
    ([type, config], index) => {
      return {
        type,
        color: colors[index % colors.length],
        ...config,
      };
  });

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
                          {renderSeatSection(row, 0, layout.aislePosition)}
                          {/* aisle */}
                          <div className="w-8"></div>
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
        <div className="legend-d gap-6 bg-gray-50 rounded-lg">
           {uniqueSeatTypes.map((seatTypes) => {
            return (
             <div key={seatTypes.type} className="flex items-center">
                <div className={`legend-child w-6 h-6 border-2 rounded-t-lg
                   ${getColorClass(seatTypes.color) || "bg-blue-100 border-blue-300"

                   }`}
                   ></div>
                   <span className="text-sm">
                     {seatTypes.name} ({currency}
                     {seatTypes.Price})
                   </span>
             </div>
            );
           })}
        </div>
        {/* summery */}
        {/* booking btn */}
    </div>
  )
}

export default CinemaSeatBooking