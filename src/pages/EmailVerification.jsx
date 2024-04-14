import { useEffect, useState } from "react";
import {  useNavigate, useSearchParams } from "react-router-dom";
import {  verifyToken } from "../apiCalls/user/auth";
import Loader from "../components/Loader";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../utils/cookies";
import { loginSuccess } from "../redux/reducers/userReducer";
const successImgUrl =
  "https://images.hiverhq.com/blog/wp-content/uploads/2023/09/tr:h-360,w-362,pr-true,cm-pad_resize,bg-FFF4F6/Account-verification-email-templates.png";

const failureImgUrl =
  "https://img.freepik.com/free-vector/work-time-concept-illustration_114360-1074.jpg?t=st=1712926266~exp=1712929866~hmac=9247fc8075432d2324dffed94643f8956c57522244d9e9a3b102b35cec49c160&w=740";

const EmailVerification = () => {
  // eslint-disable-next-line no-unused-vars
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
    console.log(response);
    if (response.status === 200) {
      userIsVerified();
      setAccessToken(token);
      dispatch(loginSuccess(response.data));
      navigate("/dashboard");
    }
    setLoading(false);
  };

  const goToDashboard = () => {
    navigate("/");
  };

  const goToLogin = () => {
    navigate("/auth");
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


// https://cffaide.r.bh.d.sendibt3.com/tr/cl/VklyloAKh3cQnTVJDTaA-WKvcKfr3s8CWRtrhm_Sw9kS-Feuhg08x3DZc23fs-GZeqynnqCaje4_Kr-eXuJcIy0O5_5n_53lRTzeq_E0wwBTdo6xZuXXobuQ4si3x7CByYSGdCAhpTXyky00O_k3bG6uZUQD_8tYru1LumdhvhfAJRJFtWVrvuqAugQK3-FftRCOqNMJsrnjEM3GDpzXUcaervByWXNCf6mWFCnBdd3L_iao_OqQIxC1j7J_ZbWiJ74zeXDvrJqNsk3rEGI_5I2-monm8AT9PLOwe2Sl2epk_T3_ogLgooJLGIDNXhW8ZGZzXRBECpxctDrRsCEnpx6ZGgUYsbrrvG43GUUEPU9c8M20hT32VA3o_McHC54D8xJ_7eI1i5RiWhfn7YW37Z3hmnPhLnCEuQtAqGWC-AiCyAoEfpxbKs-IQzsrCwtxI6jE8gJjiy7K3aN9FcFFHhjUIef4jUV2LHd5xykZor6lOxKGDB1bbB2Yb0oIY2Qdvp6E5FHzqIC59sKsiQNz5kBELUsnnzyKq3SBRxZ9ek15QtwNFyd66Md-0K7BGp_YmaPU_PiIRbKux6FWrkTyjtVmJzJP6SCI7gAFgiyv9L6CDZPXnq5FCynPr7tTHYVOxsk