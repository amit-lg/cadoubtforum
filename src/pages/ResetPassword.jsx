/* eslint-disable no-unused-vars */
import { Link, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import PasswordInput from "../components/PasswordInput";
import { useEffect, useState } from "react";
import { validatePassword } from "../utils/validators";
import { resetPassword, verifyForgetToken } from "../apiCalls/user/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openResetSuccess } from "../redux/reducers/appReducer";
import ResetSuccessPopup from "../components/ResetSuccessPopup";

const failureImgUrl =
  "https://img.freepik.com/free-vector/work-time-concept-illustration_114360-1074.jpg?t=st=1712926266~exp=1712929866~hmac=9247fc8075432d2324dffed94643f8956c57522244d9e9a3b102b35cec49c160&w=740";

const successImgUrl =
  "https://images.hiverhq.com/blog/wp-content/uploads/2023/09/tr:h-360,w-362,pr-true,cm-pad_resize,bg-FFF4F6/Account-verification-email-templates.png";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [passError, setPassError] = useState("");
  const [cPassError, setCPassError] = useState("");

  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("student");

  const [verified, setVerified] = useState(false);
  const [resetToken, setResetToken] = useState("");

  const [error, setError] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);

  const handlePassword = (e) => {
    const verified = validatePassword(e.target.value);
    if (!verified) {
      setPassError("Password must be at least 6 characters long");
    } else {
      setPassError("");
    }
    setPassword(e.target.value);
  };

  const handleCPassword = (e) => {
    const verified = validatePassword(e.target.value);
    if (!verified) {
      setCPassError("Password must be at least 6 characters long");
    } else {
      setCPassError("");
    }
    setCPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      setError("Passwords do not match");
    } else {
      const data = {
        password,
      };
      const response = await resetPassword(resetToken, data);
      if (response.status === 201) {
        setShowSuccess(true);
      }
    }
  };

  const verifyResetToken = async () => {
    const response = await verifyForgetToken(token);
    if (response.status === 200) {
      setVerified(true);
      setResetToken(response?.data?.passwordToken);
    }
  };

  const goToForgetPassPage = () => {
    navigate("/forgot-password");
  }

  useEffect(() => {
    verifyResetToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="content" role="main" className="w-full max-w-md mx-auto md:pr-3">
      <div id="content" role="main" className="w-full mx-auto">
        <div
          className={``}
          >
          {verified ? (
            <div>
              <div className="p-4 sm:p-7">
                <div className="text-center">
                  <h1 className="block lg:text-2xl text-xl font-bold text-gray-800">
                    Reset Password
                  </h1>
                  
                </div>

                <div className="mt-5">
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-y-4">
                      <div className="flex flex-col gap-5">
                        <div className="relative flex flex-col gap-1">
                          <label
                            htmlFor="email"
                            className="block text-sm font-bold ml-1"
                          >
                            Password
                          </label>
                          <PasswordInput
                            type="password"
                            id="password"
                            name="password"
                            required
                            onChange={handlePassword}
                            error={passError}
                            placeholder={"Enter new password"}
                            setError={setPassError}
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label
                            htmlFor="cpassword"
                            className="block text-sm font-bold ml-1 "
                          >
                            Confirm Password
                          </label>
                          <PasswordInput
                            type="password"
                            id="cpassword"
                            name="cpassword"
                            required
                            onChange={handleCPassword}
                            error={cPassError}
                            placeholder={"Confirm new password"}
                            setError={setCPassError}
                          />
                        </div>
                        <div className="h-2">
                          {error && (
                            <p className="text-xs text-center text-red-600">
                              {error}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button type="submit">Reset password</Button>
                    </div>
                  </form>

                  <p className="text-center mt-2 text-sm lg:text-base text-gray-600 ">
                    Remember your password?
                    <Link
                      className="text-blue-600 decoration-2 hover:underline font-medium"
                      to="/"
                    >
                      &nbsp;Login here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <div className="text-center flex flex-col gap-3">
                <h1 className="block text-5xl font-bold text-gray-800 ">
                  OOPS
                </h1>

                <h2 className="text-2xl">
                  Seems like the link has been expired
                </h2>

                <Button onClick={goToForgetPassPage}>Reset Password</Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showSuccess && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[100] outline-none focus:outline-none">
          <ResetSuccessPopup />
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
