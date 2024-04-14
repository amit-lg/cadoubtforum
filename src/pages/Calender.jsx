import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [events, setEvents] = useState([
    { date: "2024-04-05", title: "Giving speech on CFA FRM" },
    { date: "2024-04-10", title: "Giving speech on CFA FRM" },
    { date: "2024-04-15", title: "Giving speech on CFA FRM" },
  ]);

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const eventExists = events.some((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getDate() === date.getDate() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getFullYear() === date.getFullYear()
        );
      });
      return (
        eventExists && <div className="bg-red-500 w-2 h-2 rounded-full"></div>
      );
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEventClick = (date, event) => {
    console.log(`Selected date: ${date.getDate()}`);
    console.log(`Selected date: ${date.getMonth()}`);
    console.log(`Selected date: ${date.getFullYear()}`);

    // Implement logic to display event details popup here
    const selectedEvent = events.find((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
    setSelectedEvent(selectedEvent);
    // Implement logic to display event details popup here
  };

  return (
    <div className="text-black flex justify-between relative">
      {" "}
      {/* Ensuring text color is black */}
      <div className="flex justify-between w-full gap-3">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={tileContent}
          onClickDay={(date, event) => handleEventClick(date)}
        />
        <div>
          {events.map((event, index) => (
            <div className="flex gap-3" key={index}>
              <p>{event.date}</p>
              <p>{event.title}</p>
            </div>
          ))}
        </div>
      </div>
      {/* will show popup */}
      <div
        className={` ${
          selectedEvent ? "block" : "hidden"
        } absolute inset-0 h-[30%] w-[30%] z-50`}
      >
        <h3>Event</h3>
        <div>
          {selectedEvent && (
            <div>
              <img
                src="https://images.hiverhq.com/blog/wp-content/uploads/2023/09/tr:h-360,w-362,pr-true,cm-pad_resize,bg-FFF4F6/Account-verification-email-templates.png"
                alt=""
              />
              <p>{selectedEvent.date}</p>
              <p>{selectedEvent.title}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
