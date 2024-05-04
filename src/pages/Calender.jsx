import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { openCalenderPopup } from "../redux/reducers/appReducer";
import SectionHeading from "../components/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/Button";
import { calenderTabs } from "../constants/tabs";

const MyCalendar = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const [tabValue, setTabValue] = useState("dates");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [thisMonthEvent, setThisMonthEvent] = useState([]);
  const [curMonthYear, setCurMonthYear] = useState("");

  const [selectedEvent, setSelectedEvent] = useState(null);

  // const [events, setEvents] = useState(user?.events);

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const eventExists = user?.dates?.some((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getDate() === date.getDate() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getFullYear() === date.getFullYear()
        );
      });
      return (
        eventExists && (
          <div className="bg-orange-400 w-2 h-2 mx-auto rounded-full"></div>
        )
      );
    }
  };

  const handleTableValue = (value) => {
    setTabValue(value);
  };

  const handleMonthChange = ({ activeStartDate }) => {
    setCurMonthYear(
      activeStartDate.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      })
    );
    setSelectedDate(activeStartDate);
    getEventsForCurrentMonth();
  };

  const getEventsForCurrentMonth = () => {
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();
    const filteredEvents = user?.dates?.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getMonth() === currentMonth &&
        eventDate.getFullYear() === currentYear
      );
    });
    setThisMonthEvent(filteredEvents);
    setCurMonthYear(
      `${selectedDate.toLocaleString("en-US", {
        day: "numeric",
        month: "long",
      })}`
    );
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    getEventsForCurrentMonth();
  };

  const handleEventClick = (date, event) => {

    // Implement logic to display event details popup here
    const selectedEvent = user?.dates?.find((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });

    // Implement logic to display event details popup here
    if (selectedEvent) {
      dispatch(openCalenderPopup(selectedEvent));
      setSelectedEvent(selectedEvent);
    }
  };

  useEffect(() => {
    getEventsForCurrentMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  return (
    <div className="h-auto md:h-[400px] rounded-md p-2 mt-5 md:mt-0">
      <div className="flex items-center justify-between">
        <SectionHeading text="Calender" />
        {/* <span className="cursor-pointer text-blue-500 font-semibold underline decoration-2">Set Goals</span> */}
        {/* <Button className="py-1 px-1">Set Goals</Button> */}
      </div>
      <Card className="mt-3 bg-white rounded-md flex flex-col md:flex-row w-full gap-3  h-[calc(100%-28px)]">
        <div className="w-full lg:w-1/2 border rounded-md">
          <Calendar
            onActiveStartDateChange={(date) => handleMonthChange(date)}
            onChange={handleDateChange}
            value={selectedDate}
            tileContent={tileContent}
            onClickDay={(date, event) => handleEventClick(date)}
          />
        </div>

        <div className="w-full lg:w-1/2 h-full">
          <div className="flex flex-col gap-5 ">
            <div className="w-[100%] overflow-x-scroll space-x-3 h-fit whitespace-nowrap  flex justify-end">
              <div className="flex gap-1">
                {calenderTabs?.map((tab) => (
                  <button
                    onClick={() => handleTableValue(tab.value)}
                    className={`p-1 rounded-full px-4 text-sm ${
                      tab.value === tabValue
                        ? "text-white bg-blue-500"
                        : "text-gray-400 bg-white border border-gray-400"
                    }`}
                    key={tab.value}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* <SectionHeading
              text={tabValue === "dates" ? "Important Dates" : "Goals"}
            /> */}

            <>
              {tabValue === "dates" ? (
                <div className="flex flex-col gap-3 h-[320px] overflow-y-scroll ">
                  {thisMonthEvent?.length === 0 ? (
                    <p className="text-center">No events</p>
                  ) : (
                    thisMonthEvent?.map((event, index) => (
                      <div
                        onClick={() => dispatch(openCalenderPopup(event))}
                        className="cursor-pointer flex gap-5 items-center"
                        key={index}
                      >
                        <div className="flex items-center flex-col border-r-2 border-r-blue-500 px-2">
                          <span className="text-xs">
                            {event.date?.split("-")[2]}
                          </span>
                          <span className="text-xs">
                            {curMonthYear?.split(" ")[0]}
                          </span>
                        </div>
                        <p className="text-sm">{event.title}</p>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="text-center">No Goals</div>
              )}
            </>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MyCalendar;
