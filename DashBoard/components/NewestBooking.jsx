import React from 'react';

function NewestBooking() {
  // Dummy data for the newest booking
  const booking = {
    id: 1,
    customerName: 'Alice Johnson',
    roomNumber: 101,
    checkInDate: '2024-07-15',
    checkOutDate: '2024-07-20',
  };

  return (
    <div className="newest-booking">
      <h3>Newest Booking</h3>
      <p>Customer: {booking.customerName}</p>
      <p>Room: {booking.roomNumber}</p>
      <p>Check-in: {booking.checkInDate}</p>
      <p>Check-out: {booking.checkOutDate}</p>
    </div>
  );
}

export default NewestBooking;
