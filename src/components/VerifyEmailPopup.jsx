import { useEffect, useState } from "react";
import Button from "./Button";
import { resendForgetPasswordMail, resendMailToUser } from "../apiCalls/user/auth";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const url =
  "https://img.freepik.com/free-vector/character-illustration-people-with-internet-message-icons_53876-43082.jpg?t=st=1712919324~exp=1712922924~hmac=b9abe7288cb32f8c7cf9fd00f85002cc64c6b1bf7168ee8804111e4ad96e1239&w=1060";

const VerifyEmailPopup = () => {
  const time = 30;
  const [disabled, setDisabled] = useState(true);
  const [count, setCount] = useState(time); // Initial countdown value (in seconds)
  const [start, setStart] = useState(false);
  const {tempToken} = useSelector((state) => state.app);

  const location = useLocation()


  const toggleTimer = () => {
    setStart(!start);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 0) {
          clearInterval(timer);
          setDisabled(false);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [start]);

  const resendMail = async () => {

    if(location.pathname === "/"){
      const response = await resendMailToUser(tempToken);
      if (response.status === 200) {
        setDisabled(true);
        toggleTimer();
        setCount(time);
      }
    }else{
      const response = await resendForgetPasswordMail(tempToken);
      if (response.status === 200) {
        setDisabled(true);
        toggleTimer();
        setCount(time);
      }
    }
  };

  return (
    <div className="h-screen w-full relative">
      <div className=" h-full w-full flex flex-col">
        <div className="h-full w-full flex items-center justify-center">
          <div className="relative my-6 mx-auto w-[90%] sm:w-[70%] md:w-[70%] lg:w-[60%] xl:w-[30%] z-50 rounded-md bg-white p-5">
            {/* <div className="w-full flex items-center justify-between">
              <MdClose
                onClick={handleClose}
                className="text-xl cursor-pointer absolute top-2 right-2"
              />
            </div> */}
            <div className="flex flex-col gap-3 my-5 items-center">
              <h2 className="text-2xl text-blue-500">
                Please Verify your email
              </h2>
              <h4 className="text-lg">
                An email has been sent to your email id.
              </h4>
              <img
                className="h-52 w-52 object-contain"
                src={url}
                alt="Verify email"
              />
              <Button onClick={resendMail} disabled={disabled}>
                Resend Email{" "}
              </Button>
              {count > 0 && <span>Resend email in {count} s</span>}
            </div>
          </div>

          <div className="absolute opacity-25 h-full w-full inset-0 z-40 bg-black"></div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPopup;
