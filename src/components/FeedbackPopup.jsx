import { closeFeedbackPopup } from "../redux/reducers/appReducer";
import { useDispatch } from "react-redux";
import Input from "./Input";
import { useState } from "react";
import Button from "./Button";
import SectionHeading from "./SectionHeading";
import { MdClose } from "react-icons/md";

const FeedbackPopup = () => {
  const [featureTitle, setfeatureTitle] = useState("");
  const [featureDescription, setfeatureDescription] = useState("");
  const [error, setError] = useState("");

  const handleFeatureTitle = (e) => {
    setfeatureTitle(e.target.value);
  };

  const handleFeatureDescription = (e) => {
    setfeatureDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!featureTitle) {
      setError("Please enter a feature title");
      return;
    } else if (!featureDescription) {
      setError("Please enter a feature description");
    }

    const data = {
      featureTitle,
      featureDescription,
    };
    console.log(data);
  };

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeFeedbackPopup());
  };
  return (
    <div className="h-screen w-full" onClick={handleClose}>
      <div className="h-full w-full flex flex-col">
        <div className="h-full w-full">
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="bg-white relative my-6 mx-auto w-[90%] sm:w-[70%] md:w-[70%] lg:w-[60%] xl:w-[40%] rounded-md space-y-3">
              <div className="absolute top-0 right-0 p-2 cursor-pointer">
                <MdClose />
              </div>
              <div className="p-4 space-y-3">
                <h3 className="text-xl font-semibold">Provide your feedback</h3>
                <form onSubmit={handleSubmit} className="space-y-3 flex flex-col" action="">
                  <Input
                    label="Feature"
                    type="text"
                    value={featureTitle}
                    onChange={handleFeatureTitle}
                    name={"featureTitle"}
                    placeholder={"Enter the feature title"}
                    required={true}
                  />

                  <textarea
                    value={featureDescription}
                    onChange={handleFeatureDescription}
                    name="featureDescription"
                    rows="10"
                    cols="50"
                    placeholder="Enter the feature description"
                    className="shadow-lg  w-full p-2.5 text-sm text-gray-900 bg-gray-100 border-none rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    required
                  ></textarea>

                  <Button className="w-max self-end" type="submit">Submit</Button>
                </form>
              </div>
            </div>
          </div>
          <div
            onClick={handleClose}
            className="opacity-25 h-full w-full inset-0 z-40 bg-black"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPopup;
