import { MdFileCopy } from "react-icons/md";
import Button from "../components/Button";
import PropTypes from "prop-types";
import { terms } from "../constants/terms-and-conditions";

const TermsAndCondition = ({ onAccept, onDecline }) => {
  return (
    <div className="fade-enter flex flex-col gap-2 h-[70vh] md:h-full overflow-scroll p-2">
      {/* Header */}
      <div className="h-[20%] py-4 w-full flex items-center  border-b px-8 gap-5">
        <MdFileCopy className="text-5xl text-blue-500" />
        <div className=" flex flex-col">
          <h1 className="text-gray-600 md:text-2xl text-xl font-semibold">
            Terms of service
          </h1>
          <p className="text-xs md:text-base text-gray-400">Last Updated Feb 2024</p>
        </div>
      </div>

      {/* Body */}
      <div className="mx-6 h-[400px]  px-3 overflow-y-scroll scrollbar-blue scrollbar flex flex-col gap-5">
        {
          terms?.map((term, idx) => (
            <div key={term.heading} className="space-y-1">
              <h4 className="text-gray-700 font-semibold">{idx + 1}. {term.heading}</h4>
              <div className="">
                <p className="text-sm text-gray-500">
                  {term.description}
                </p>
              </div>
            </div>
          ))
        }
      </div>

      {/* Buttons */}
      <div className="px-6 flex items-center gap-3 justify-end mt-3" >
        <Button
          onClick={onDecline}
          textColor={"text-blue-500"}
          className="px-3 py-3 border-blue-500 border-2 font-semibold bg-transparent"
        >
          Decline
        </Button>
        <Button
          onClick={onAccept}
          className="px-3 py-3 border-blue-500 border-2 font-semibold bg-blue-500 text-white"
        >
          Accept
        </Button>
      </div>
    </div>
  );
};

export default TermsAndCondition;

TermsAndCondition.propTypes = {
  onAccept: PropTypes.func,
  onDecline: PropTypes.func,
};
