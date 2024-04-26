import Button from "./Button";
import { MdClose } from "react-icons/md";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { reportAAnswer, reportAQuestion } from "../apiCalls/question";
import { useState } from "react";

const Report = ({ handleClose }) => {
  const { reportData } = useSelector((state) => state.app);
  const [error, setError] = useState("");

  const [reportText, setReportText] = useState("");

  const handleRepotTextChange = (e) => {
    setReportText(e.target.value);
    if (e.target.value) {
      setError("");
    }
  };

  const handleSubmit = async () => {
    if (reportText === "") {
      setError("Please tell us a breif about the issue");
      return;
    }

    const data = {
      ...reportData,
      reportText,
    };
    if (reportData?.questionId) {
      const response = await reportAQuestion(data);
      if (response.status === 200) {
        handleClose();
      }
    } else {
      const response = await reportAAnswer(data);
      if (response.status === 200) {
        handleClose();
      }
    }
  };

  return (
    <div className="h-screen w-full">
      <div className="h-full w-full flex flex-col">
        <div className="h-full w-full  flex items-center justify-center">
          <div className="relative mx-auto w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[25%] p-2 z-50">
            {/*content*/}
            <div className="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none rounded-md">
              {/*header*/}
              <div className="bg-white flex items-start justify-between p-2 rounded-t-md">
                <img
                  src="https://img.freepik.com/free-vector/flat-design-no-data-illustration_23-2150527130.jpg?t=st=1712741903~exp=1712745503~hmac=7ab2c154db475f14b92833377274dde53ce4bf3b2814ca35868ed09207344087&w=740"
                  alt="Report"
                  className="h-40 w-40 mx-auto object-contain"
                />
                <button
                  className="absolute top-2 right-2 p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={handleClose}
                >
                  <span className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    <MdClose className="text-black" />
                  </span>
                </button>
              </div>

              {/*body*/}

              <div className="flex flex-col gap-3">
                <p className="text-sm md:text-sm p-2 text-center">
                  Thank you for your contribution to maintaining a positive
                  community experience. Your feedback is invaluable to us.
                  Please provide a brief reason for reporting this content. We
                  take reports seriously and will review them promptly.
                </p>
                <div className="px-2 rounded-md">
                  <textarea
                    required
                    placeholder="Enter your reason"
                    className="px-2 bg-gray-100 p-2 border-none outline-none w-full rounded-md"
                    cols="30"
                    rows="3"
                    value={reportText}
                    onChange={handleRepotTextChange}
                  ></textarea>
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-between px-6 py-4 border-t border-solid border-blueGray-200 rounded-b">
                <div>
                  <span className="text-red-500 text-xs text-left">
                    {error}
                  </span>
                </div>
                <div className="flex items-center">
                  <Button
                    className="text-white bg-red-500 font-bold uppercase p-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    className=" text-white active:bg-emerald-600 font-bold uppercase text-sm p-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={handleClose}
            className="absolute opacity-25 h-full w-full inset-0 z-40 bg-black"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Report;

Report.propTypes = {
  handleClose: PropTypes.func,
};
