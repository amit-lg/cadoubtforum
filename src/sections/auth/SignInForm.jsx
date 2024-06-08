import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { validateEmail, validatePassword } from "../../utils/validators";
import PropTypes from "prop-types";
import { loginUser } from "../../apiCalls/user/auth";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/reducers/userReducer";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import { openChooseCoursePopup, openVerifyEmail, setTempToken } from "../../redux/reducers/appReducer";
import { setNotifications } from "../../redux/reducers/notificationReducer";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [phone, setPassword] = useState("");

  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initializeForm = () => {
    setEmail("");
    setPassword("");
    setError("");
    setEmailError(false);
    setPasswordError(false);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const validated = validateEmail(e.target.value);
    if (!validated) {
      setEmailError(true);
      setError("Please enter a valid email address");
    } else {
      setEmailError(false);
      setError("");
    }
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    const validated = validatePassword(e.target.value);
    if (!validated) {
      setPasswordError(true);
      setError("Password must be at least 6 characters");
    } else {
      setPasswordError(false);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValidated = validateEmail(email);
    if (!emailValidated) {
      setError("Please enter a valid email address");
      return;
    }

    const passwordValidated = validatePassword(password);
    if (!passwordValidated) {
      
      return;
    }

    setError("");

    const response = await loginUser(email, password);
    if (response.status === 200) {
      if(response?.data?.message){
        dispatch(openChooseCoursePopup());
        dispatch(setTempToken(response?.data?.token));
        return;
      }
      initializeForm();
      dispatch(loginSuccess(response.data));
      dispatch(setNotifications(response?.data?.notify));
      navigate("/dashboard");
    } else if (response?.status === 403) {
      dispatch(openVerifyEmail());
      dispatch(setTempToken(response?.error?.token));
      setError("Please verify your email");
    } else {
      setError(response.msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full ">
      <div className="space-y-3 flex flex-col w-full">
        <Input
          type="text"
          placeholder={"Enter your email"}
          value={email}
          onChange={handleEmail}
          name={"email"}
          error={emailError}
          setError={setEmailError}
          required={true}
        />
        <PasswordInput
          type="password"
          placeholder={"Enter your password"}
          value={password}
          onChange={handlePassword}
          name={"password"}
          error={passwordError}
          setError={setPasswordError}
          required={true}
        />

        <div className="h-[10px]">
          <p className="text-red-500 text-center text-xs">
            {error ? error : ""}
          </p>
        </div>

        <Button
          className="lg:bg-signin-btn font-semibold"
          fullWidth
          type="submit"
        >
          Sign In
        </Button>

        <Link className="text-center" to={"/forgot-password"}>
          <span className="text-center text-sm">Forgot Password?</span>
        </Link>
      </div>
    </form>
  );
};

export default SigninForm;

SigninForm.propTypes = {
  handleLoginView: PropTypes.func,
};
