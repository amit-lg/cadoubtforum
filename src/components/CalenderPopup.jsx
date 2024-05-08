import { closeCalenderPopup } from "../redux/reducers/appReducer";
import { useDispatch, useSelector } from "react-redux";
import SectionHeading from "./SectionHeading";
import Button from "../components/Button";
import { FaRegClock } from "react-icons/fa";

const CalenderPopup = () => {
  const { event } = useSelector((state) => state.app);

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeCalenderPopup());
  };

  const newDate = new Date(event.date).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="h-screen w-full">
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div className="bg-white relative my-6 mx-auto w-[90%] sm:w-[75%] md:w-[75%] lg:w-[65%] xl:w-[35%] z-50 rounded-md space-y-3">
          <div className="space-y-5 flex flex-col p-4">
            <div className="flex items-center justify-between text-orange-300">
              <SectionHeading text={event.title} />

              <div className="flex items-center gap-2">
                <FaRegClock className="text-gray-500" />
                <div className="self-end font-semibold flex items-center w-max border-l-2 border-l-blue-500 px-2">
                  <span className="text-xs text-gray-400">{newDate}</span>
                </div>
              </div>
            </div>

            {event?.description && <div className="p-4 space-y-3 bg-gray-100 rounded-md">
              <p className="text-base">{event?.description}</p>
            </div>}

            <div className="flex items-center justify-end">
              <Button
                onClick={handleClose}
                className="bg-red-400 w-max self-end"
              >
                Close
              </Button>
              {/* <Button onClick={handleClose} className="w-max self-end">
                Visit now
              </Button> */}
            </div>
          </div>
        </div>{" "}
        <div
          onClick={handleClose}
          className="opacity-25 h-full w-full inset-0 z-40 absolute bg-black"
        ></div>
      </div>
    </div>
  );
};

export default CalenderPopup;