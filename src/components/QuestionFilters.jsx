import { useState } from "react";
import { MdFilterList } from "react-icons/md";
import PropTypes from "prop-types";

const QuestionFilters = ({setFilters}) => {
  const [openFilterList, setOpenFilterList] = useState(false);

  const toggleFilterList = () => {
    setOpenFilterList((openFilterList) => !openFilterList);
  };

  const handleFilters = (value) => {
    setFilters(value);
    toggleFilterList();
  }
  return (
    <div className="relative">
      <MdFilterList onClick={toggleFilterList} className="text-2xl font-bold" />
      {openFilterList && (
        <div className="bg-white absolute shadow  top-7 right-3 w-28 h-fit z-30 px-1 py-1">
          <ul className="flex flex-col gap-1 text-center w-full">
            <li onClick={() => handleFilters("likes")} className="cursor-pointer px-2 rounded w-full bg-white hover:bg-gray-200 transition-all duration-300 ease-in-out">
              By Likes
            </li>
            {/* <li onClick={() => handleFilters("dateup")} className="cursor-pointer px-2 rounded w-full bg-white hover:bg-gray-200 transition-all duration-300 ease-in-out">
              By Oldest
            </li> */}
            <li onClick={() => handleFilters("datedown")} className="cursor-pointer px-2 rounded w-full bg-white hover:bg-gray-200 transition-all duration-300 ease-in-out">
              By Oldest
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
