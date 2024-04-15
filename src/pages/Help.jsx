import { useDispatch } from "react-redux";
import Button from "../components/Button";
import { contact } from "../constants/contact-details";
import Faq from "./Faq";
import { openRaiseIssuePopup } from "../redux/reducers/appReducer";
const url =
  "https://img.freepik.com/free-vector/thoughtful-woman-with-laptop-looking-big-question-mark_1150-39362.jpg?w=740&t=st=1712825161~exp=1712825761~hmac=b10bbf375b29e789e01e4f64abb0cfa094da74851e62f23eb3158c020b26c48f";

const Help = () => {
  const dispatch = useDispatch();
  return (
    <div className="fade-enter h-full w-full flex flex-col">
      <div className="flex flex-col gap-5  justify-between h-full">
        <div className="flex flex-col w-full items-center justify-center">
          <div className="flex items-center justify-between w-[90%]">
            <h1 className="text-3xl text-blue-500 font-semibold">
              Frequently asked Questions
            </h1>
            <img className="h-52 w-52 object-contain" src={url} alt="" />
          </div>

          {/* <Faq/> */}

          <div className="w-[90%] self-center">
            <Faq />
          </div>
        </div>

        <div className="md:mx-20 mt-32 p-5 rounded-md flex items-center justify-center flex-col gap-3 bg-blue-400 text-white">
          <div className="flex flex-col gap-3">
            <h3 className="text-center text-2xl font-semibold">
              Still have question?
            </h3>
            <p className="text-center text-base">Mail us at {contact.email}</p>
          </div>

          <span className="text-center text-lg">OR</span>

          <div>
            <Button onClick={() => dispatch(openRaiseIssuePopup())} className="rounded-full bg-blue-500">Raise a issue</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;

{
  /* <form className="mb-12 w-full shrink-0 grow-0 basis-auto lg:mb-0 lg:w-[60%]">
              <div className="mb-3 w-full">
                <label
                  className="block font-medium mb-[2px] text-blue-500"
                  htmlFor="exampleInput90"
                >
                  Name
                </label>
                <input
                  type="text"
                  disabled
                  className="px-2 py-2 border w-full outline-none rounded-md"
                  id="exampleInput90"
                  placeholder="Name"
                  value={user?.name}
                />
              </div>

              <div className="mb-3 w-full">
                <label
                  className="block font-medium mb-[2px] text-blue-500"
                  htmlFor="exampleInput90"
                >
                  Email
                </label>
                <input
                  disabled
                  type="email"
                  className="px-2 py-2 border w-full outline-none rounded-md"
                  id="exampleInput90"
                  placeholder="Enter your email address"
                  value={user?.email}
                />
              </div>

              <div className="mb-3 w-full">
                <label
                  className="block font-medium mb-[2px] text-blue-500"
                  htmlFor="exampleInput90"
                >
                  Message
                </label>
                <textarea
                  className="px-2 py-2 border rounded-[5px] w-full outline-none"
                  name=""
                  id=""
                  rows={10}
                ></textarea>
              </div>

              <Button
                type="button"
                className="w-full py-3 rounded bg-blue-500 font-medium uppercase leading-normal text-white hover:shadow-md hover:bg-blue-600"
              >
                Send
              </Button>
            </form> */
}
