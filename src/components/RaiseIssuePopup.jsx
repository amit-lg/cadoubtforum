import { useDispatch } from "react-redux";
import { closeRaiseIssuePopup } from "../redux/reducers/appReducer";
import { useState } from "react";
import Button from "./Button";
import { MdClose } from "react-icons/md";

const RaiseIssuePopup = () => {
  const [text, setText] = useState("");

  const handleText = (e) => {
    setText(e.target.value);
  };

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeRaiseIssuePopup());
  };

  return (
    <div className="h-screen w-full relative">
      <div className=" h-full w-full flex flex-col">
        <div className="h-full w-full flex items-center justify-center">
          <div className="relative my-6 mx-auto w-[90%] sm:w-[70%] md:w-[70%] lg:w-[60%] xl:w-[30%] z-50 rounded-md bg-white p-5">
            <div className="w-full flex items-center justify-between">
              <h3 className="text-2xl">Describe your issue</h3>
              <MdClose onClick={handleClose} className="text-xl cursor-pointer"/>
            </div>
            <form className="flex flex-col gap-3 mt-5 w-full ">
              <select
                className="w-full bg-gray-100 p-2 rounded-md outline-none"
                name="raiseIssue"
                id="raiseIssue"
                value={""}
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
                value={text}
                onChange={handleText}
                rows={10}
                type="text"
              />

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
