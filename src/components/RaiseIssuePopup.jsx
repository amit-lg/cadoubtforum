import { useDispatch, useSelector } from "react-redux";
import {
  closeRaiseIssuePopup,
  closeSubmitSuccessPopop,
  openSubmitSuccessPopop,
} from "../redux/reducers/appReducer";
import { useState } from "react";
import Button from "./Button";
import { MdClose } from "react-icons/md";
import Progress from "./Progress";
import { addIssue } from "../apiCalls/contact";

const RaiseIssuePopup = () => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const { submitSuccessPopop } = useSelector((state) => state.app);

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeRaiseIssuePopup());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) {
      setError("Please enter a feature title");
      return;
    } else if (!description) {
      setError("Please enter a feature description");
    }

    dispatch(closeRaiseIssuePopup());

    const data = {
      category,
      description,
    };

    const response = await addIssue(data);
    if (response.status === 200) {
      dispatch(openSubmitSuccessPopop());

      setTimeout(() => {
        dispatch(closeSubmitSuccessPopop());
      }, [3000]);
    }
  };

  return (
    <div className="h-screen w-full relative">
      <div className=" h-full w-full flex flex-col">
        <div className="h-full w-full flex items-center justify-center">
          <div className="relative my-6 mx-auto w-[90%] sm:w-[70%] md:w-[70%] lg:w-[60%] xl:w-[30%] z-50 rounded-md bg-white p-5">
            <div className="w-full flex items-center justify-between">
              <h3 className="text-2xl">Describe your issue</h3>
              <MdClose
                onClick={handleClose}
                className="text-xl cursor-pointer"
              />
            </div>

            {submitSuccessPopop && (
              <div className="z-60 absolute w-[90%] flex items-center justify-center h-full">
                <div className="bg-white shadow-lg rounded-b-md w-fit h-fit z-50 relative p-5 flex items-center justify-center flex-col gap-3">
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
                    Form submitted succesfullly
                  </h3>
                  <p>Thank you for your feedback we will look into it soon.</p>
                </div>
                <div
                  className="bg-black opacity-20 h-full w-full absolute z-40"
                  onClick={handleClose}
                ></div>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 mt-5 w-full "
            >
              <select
                className="w-full bg-gray-100 p-2 rounded-md outline-none"
                name="raiseIssue"
                id="raiseIssue"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option className="w-full" disabled value="">
                  Choose issue category
                </option>
                <option className="w-full" value="content">
                  Content Issue
                </option>
                <option className="w-full" value="technical">
                  Technical Issue
                </option>
              </select>

              <textarea
                placeholder={"Write about your issue"}
                className="p-2 rounded-md outline-none bg-gray-100"
                value={description}
                onChange={handleDescription}
                rows={10}
                type="text"
              />

              <div className="h-2 flex items-center justify my-2">{error}</div>

              <Button className="self-end ">Submit</Button>
            </form>
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

export default RaiseIssuePopup;
