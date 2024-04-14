import { useEffect, useState } from "react";
import {  useNavigate, useSearchParams } from "react-router-dom";
import { resendMailToUser, verifyToken } from "../apiCalls/user/auth";
import Loader from "../components/Loader";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../utils/cookies";
import { openVerifyEmail } from "../redux/reducers/appReducer";
const successImgUrl =
  "https://images.hiverhq.com/blog/wp-content/uploads/2023/09/tr:h-360,w-362,pr-true,cm-pad_resize,bg-FFF4F6/Account-verification-email-templates.png";

const failureImgUrl =
  "https://img.freepik.com/free-vector/work-time-concept-illustration_114360-1074.jpg?t=st=1712926266~exp=1712929866~hmac=9247fc8075432d2324dffed94643f8956c57522244d9e9a3b102b35cec49c160&w=740";

const EmailVerification = () => {
  // Getting token in url query as student take it in token varibale using useSearchParams
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("student");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [verified, setVerfied] = useState(false);
  const [loading, setLoading] = useState(true);

  const userIsVerified = () => {
    setVerfied(true);
  };

  const verifyEmail = async () => {
    const response = await verifyToken(token);
    if (response.status === 200) {
      userIsVerified();
      dispatch(setAccessToken(token));
    }
    setLoading(false);
  };

  const goToDashboard = () => {
    navigate("/login");
  };

  const goToLogin = () => {
    navigate("/");
  };

  useEffect(() => {
    token && verifyEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="xl:w-[30%] lg:w-[40%] md:w-[50%] w-[70%] flex items-center justify-center">
        {loading ? (
          <Loader />
        ) : verified ? (
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold text-center">Email verified successfully</h1>
            <img className="h-52 w-52 object-contain" src={successImgUrl} alt="Email verification" />
            <Button onClick={goToDashboard} className="py-4 text-lg">Login</Button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 items-center justify-center">
            <h1 className="text-3xl font-bold text-center">Email verification failed</h1>
            <img className="h-72 w-72 object-contain" src={failureImgUrl} alt="Email verification" />
            <Button onClick={goToLogin} className="w-full py-4 text-lg">Login</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
