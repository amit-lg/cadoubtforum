import { useDispatch } from "react-redux";
import { closeSubmitSuccessPopopIssue , closeSubmitSuccessPopopForFeedback } from "../redux/reducers/appReducer";
import Progress from "./Progress";
import PropTypes from "prop-types";

const FormSuccessPopup = ({ type }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeSubmitSuccessPopopForFeedback());
    dispatch(closeSubmitSuccessPopopIssue());
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
        <div className="z-60 absolute w-full mx-auto flex items-center justify-center h-full">
          <div className="bg-white shadow-lg rounded-b-md w-[90%] sm:w-fit h-fit z-50 relative p-5 flex items-center justify-center flex-col gap-3">
            <div className="absolute top-0 left-0 w-full">
              <Progress />
            </div>
            <img
              height={50}
              width={50}
              className="object-contain"
              src="/checked.png"
            />

            <h3 className="text-xl font-medium">
              {type === "feedback"
                ? "Form submitted succesfullly"
                : "Form submitted succesfullly"}
            </h3>
            <p>
              {type === "feedback"
                ? "Thank you for your feedback we will look into it soon."
                : "We are sorry for the issue faced, we will look into it soon."}
            </p>
          </div>
          <div
            className="bg-black opacity-20 h-full w-full absolute z-40"
            onClick={handleClose}
          ></div>
        </div>
    </div>
  );
};

export default FormSuccessPopup;

FormSuccessPopup.propTypes = {
  type: PropTypes.string,
};
