import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import { validateEmail } from "../utils/validators";
import {
  forgetPassword,
} from "../apiCalls/user/auth";
import { useDispatch, useSelector } from "react-redux";
import { openVerifyEmail, setTempToken } from "../redux/reducers/appReducer";
import VerifyEmailPopup from "../components/VerifyEmailPopup";

const ForgetPassword = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const { showVerifyEmail } = useSelector((state) => state.app);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validated = validateEmail(email);
    if (!validated) {
      setError("Please enter a valid email address");
    } else {
      setError("");
    }

    const data = {
      email,
    };

    const response = await forgetPassword(data);
    if (response.status === 200) {
      setError("");
      dispatch(setTempToken(response?.data?.accessToken));
      dispatch(openVerifyEmail());
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const validated = validateEmail(e.target.value);
    if (!validated) {
      setError("Please enter a valid email address");
    } else {
      setError("");
    }
  };

  return (
    <main className="flex flex-col justify-center min-h-screen">
      <div id="content" role="main" className="w-full   max-w-md mx-auto p-6">
        <div className="mt-7 bg-white  rounded-xl shadow-lg">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800">
                OOPS!!
              </h1>
              <h3 className="mt-1 text-lg">
                You forgot your password dont&apos;t worry.
              </h3>
            </div>

            <div className="mt-5">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold ml-1 mb-2 "
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        required
                        aria-describedby="email-error"
                        value={email}
                        onChange={handleEmail}
                        placeholder="Enter your email address"
                        setError={setError}
                      />
                    </div>

                    <div className="h-2">
                      {error && (
                        <p
                          className="text-xs text-red-600 mt-2"
                          id="email-error"
                        >
                          {error}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button type="submit">Submit</Button>
                </div>
              </form>

              <p className="text-center mt-2 text-sm text-gray-600 ">
                Remember your password?
                <Link
                  className="text-blue-600 decoration-2 hover:underline font-medium"
                  to="/"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {showVerifyEmail && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[100] outline-none focus:outline-none">
          <VerifyEmailPopup />
        </div>
      )}
    </main>
  );
};

export default ForgetPassword;