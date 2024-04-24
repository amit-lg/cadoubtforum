import { useRef, useState } from "react";
import {
  MdArrowDownward,
  MdFilterList,
  MdOutlineThumbUp,
} from "react-icons/md";
import { RxReset } from "react-icons/rx";
import PropTypes from "prop-types";
import useOutsideClick from "../hooks/usClickOutside";
import { IoMdEye } from "react-icons/io";

const QuestionFilters = ({ setFilters }) => {
  const [openFilterList, setOpenFilterList] = useState(false);

  const impactRef = useRef();

  const toggleFilterList = () => {
    setOpenFilterList((openFilterList) => !openFilterList);
  };

  const closeMenu = () => {
    setOpenFilterList(false);
  };

  useOutsideClick(impactRef, closeMenu);

  const handleFilters = (value) => {
    setFilters(value);
    toggleFilterList();
  };
  return (
    <div className="relative" ref={impactRef}>
      <div
        onClick={toggleFilterList}
        className="p-1 rounded-full hover:shadow-lg transition-all duration-200 ease-in-out cursor-pointer bg-transparent"
      >
        <MdFilterList className="text-2xl font-bold" />
      </div>
      {openFilterList && (
        <div className="bg-white absolute shadow  top-7 right-3 w-max h-fit z-30 px-2 py-2 rounded-md">
          <ul className="flex flex-col gap-1 text-center w-full">
            <li
              onClick={() => handleFilters("likes")}
              className="cursor-pointer px-2 rounded w-full text-base text-gray-500 bg-white hover:bg-gray-200 transition-all duration-300 ease-in-out flex gap-3 items-center"
            >
              <MdOutlineThumbUp className="text-base text-gray-500" /> Most
              Liked
            </li>
            <li
              onClick={() => handleFilters("datedown")}
              className="cursor-pointer px-2 rounded w-full text-base text-gray-500 bg-white hover:bg-gray-200 transition-all duration-300 ease-in-out flex gap-3 items-center"
            >
              <MdArrowDownward className="text-base text-gray-500" /> By Oldest
            </li>
            <li
              onClick={() => handleFilters("views")}
              className="cursor-pointer px-2 rounded w-full text-base text-gray-500 bg-white hover:bg-gray-200 transition-all duration-300 ease-in-out flex gap-3 items-center"
            >
              <IoMdEye className="text-base text-gray-500" /> Most viewed
            </li>
            <li
              onClick={() => handleFilters("")}
              className="cursor-pointer px-2 rounded w-full bg-white text-base text-gray-500 hover:bg-gray-200 transition-all duration-300 ease-in-out flex gap-3 items-center"
            >
              <RxReset className="text-base text-gray-500" /> Reset
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuestionFilters;

QuestionFilters.propTypes = {
  setFilters: PropTypes.func,
};
