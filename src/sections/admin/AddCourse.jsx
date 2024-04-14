import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import PropTypes from "prop-types";

const AddCourse = ({ showAddCourseModal, handleClose }) => {
  

  const [courseYear, setCourseYear] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseSub, setCourseSub] = useState("");
  const [courseAbbr, setCourseAbbr] = useState("");

  const handleCourseAbbr = (e) => {
    setCourseAbbr(e.target.value);
  };

  const handleCourseName = (e) => {
    setCourseName(e.target.value);
  };

  const handleCourseSub = (e) => {
    setCourseSub(e.target.value);
  };

  const handleCourseYear = (e) => {
    setCourseYear(e.target.value);
  };
  return (
    <div className="h-full w-full">
      {showAddCourseModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add Course</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={handleClose}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                {/*body*/}
                <div className="relative p-6 flex-auto flex flex-col gap-3">
                  <Input
                    label={"Course Name"}
                    placeholder={"Enter course name"}
                    type={"text"}
                    name={"courseName"}
                    value={courseName}
                    onChange={handleCourseName}
                  />
                  <Input
                    label={"Course Abbreviation"}
                    placeholder={"Enter course abbreviation"}
                    type={"text"}
                    name={"courseAbbr"}
                    value={courseAbbr}
                    onChange={handleCourseAbbr}
                  />

                  <select
                    name="course year"
                    id="courseYyear"
                    className={`
                              transition-all ease-in-out duration-700 p-2 bg-gray-300 w-full rounded-md  text-sm outline-none
                              ${courseYear ? "text-black" : "text-gray-400"}
                          `}
                    onChange={handleCourseYear}
                    value={courseYear}
                    defaultValue={""}
                  >
                    <option value="">Select Year</option>
                    <option value="2013">2013</option>
                    <option value="2014">2014</option>
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                  </select>

                  <select
                    name="course year"
                    id="courseYyear"
                    className={`
                              p-2 bg-gray-300 w-full rounded-md  text-sm outline-none
                              ${courseSub ? "text-black" : "text-gray-400"}
                          `}
                    onChange={handleCourseSub}
                    value={courseSub}
                    defaultValue={""}
                  >
                    <option value="">Select Course</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermedaite">Intermedaite</option>
                    <option value="Advanced">Advanced </option>
                  </select>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <Button
                    className=" text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleClose}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={handleClose}
            className="opacity-25 h-full w-full inset-0 z-40 bg-black"
          ></div>
        </>
      ) : null}
    </div>
  );
};

export default AddCourse;

AddCourse.propTypes = {
  showAddCourseModal: PropTypes.bool,
  handleClose: PropTypes.func,
};
