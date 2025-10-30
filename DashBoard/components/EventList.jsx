import React from 'react';

const EventList = ({ events }) => {
  return (
    <div className="events-section">
      <h3 className="section-title">Latest Events</h3>
      {events.map((event, index) => (
        <div key={index} className="event-item">
          <div className="event-title">{event.title}</div>
          <div className="event-date">{event.date}</div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
