import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import PropTypes from "prop-types";

const AccordionSection = ({ question, answer }) => {
  const [opened, setOpened] = useState(false);
  const toggle = () => setOpened((opened) => !opened);

  return (
    <div className="rounded-none border border-t-0 border-l-0 border-r-0 border-neutral-200">
      <h2 className="mb-0" id="flush-headingOne">
        <button
          onClick={toggle}
          className={`group relative flex w-full items-center rounded-none border-0 py-4 px-5 text-left text-base font-bold transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none"
          type="button ${opened ? "text-orange-500" : "text-gray-500"}`}
        >
          {question}
          <span
            className={`
          ml-auto h-5 w-5 shrink-0 text-blue-500 transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none
          ${opened ? "rotate-180" : ""}
          `}
          >
            <IoIosArrowDown />
          </span>
        </button>
      </h2>
      <div
        id="flush-collapseOne"
        className={`border-0 transition-all ease-in-out duration-300
         ${opened ? "h-[100px] overflow-y-scroll" : "h-0 overflow-hidden"}`}
        data-te-collapse-item
        data-te-collapse-show
        aria-labelledby="flush-headingOne"
        data-te-parent="#accordionFlushExample"
      >
        <div className="py-4 px-5 text-gray-400">{answer}</div>
      </div>
    </div>
  );
};

export default AccordionSection;

AccordionSection.propTypes = {
  answer: PropTypes.string,
  question: PropTypes.object,
};
