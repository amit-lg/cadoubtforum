import { MdFileCopy } from "react-icons/md";
import Button from "../components/Button";
import PropTypes from "prop-types";

const TermsAndCondition = ({ onAccept, onDecline }) => {
  return (
    <div className="fade-enter flex flex-col gap-2 h-[70vh] md:h-full overflow-scroll">
      {/* Header */}
      <div className="h-[20%] w-full flex items-center  border-b px-8 gap-5">
        <MdFileCopy className="text-5xl text-blue-500" />
        <div className=" flex flex-col">
          <h1 className="text-gray-600 md:text-2xl text-xl font-semibold">
            Terms of service
          </h1>
          <p className="text-xs md:text-base text-gray-400">Last Updated Feb 2024</p>
        </div>
      </div>

      {/* Body */}
      <div className="mx-6 h-[60%] px-3 overflow-y-scroll scrollbar-blue scrollbar">
        <h4 className="text-gray-700 font-semibold">1. Terms</h4>
        <div className="">
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed iure
            libero laborum ab laboriosam dolores, quo quam dolorem culpa est
            tempore ea doloribus aut, velit iusto et a debitis quas consequatur.
            Ducimus odio harum eius? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Sed iure libero laborum ab laboriosam dolores, quo
            quam dolorem culpa est tempore ea doloribus aut, velit iusto et a
            debitis quas consequatur. Ducimus odio harum eius? Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Sed iure libero laborum ab
            laboriosam dolores, quo quam dolorem culpa est tempore ea doloribus
            aut, velit iusto et a debitis quas consequatur. Ducimus odio harum
            eius? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
            iure libero laborum ab laboriosam dolores, quo quam dolorem culpa
            est tempore ea doloribus aut, velit iusto et a debitis quas
            consequatur. Ducimus odio harum eius?
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="px-6 flex items-center gap-3 justify-end mt-3">
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
