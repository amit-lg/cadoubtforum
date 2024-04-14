import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../utils/validators";
import { loginAdmin } from "../apiCalls/user/auth";
import Input from "../components/Input";
import Button from "../components/Button";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const initializeForm = () => {
    setEmail("");
    setPassword("");
    setError("");
    setEmailError(false);
    setPasswordError(false);
  };

  let submited = false;

  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (submited) {
      const validated = validateEmail(e.target.value);
      if (!validated) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (submited) {
      const validated = validatePassword(e.target.value);
      if (!validated) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    submited = true;
    const emailValidated = validateEmail(email);
    if (!emailValidated) {
      setError("Please enter a valid email address");
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }

    const passwordValidated = validatePassword(password);
    if (!passwordValidated) {
      setError("Password must be at least 6 characters");
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    const response = await loginAdmin(email, password);
    if (response.status === 200) {
      initializeForm();
      //   dispatch(loginSuccess(response.data.accessToken));
      navigate("/admin");
    } else {
      setError(response.data.msg);
    }
  };

  return (
    <div className="p-2 flex items-center justify-center h-screen w-full">
      <div className="shadow p-5 flex items-center flex-col gap-5 h-max w-[90%] lg:w-[30%] md:w-[50%] sm:w-[70%]">
        <div>
          <h1 className="text-3xl font-bold">Admin Login</h1>
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="space-y-3 flex flex-col w-full">
            <Input
              type="text"
              placeholder={"Enter your email"}
              value={email}
              onChange={handleEmail}
              name={"email"}
              error={emailError}
            />
            <Input
              type="password"
              placeholder={"Enter your password"}
              value={password}
              onChange={handlePassword}
              name={"password"}
              error={passwordError}
            />

            <div className="h-[10px]">
              <p className="text-red-500 text-center text-xs">
                {error ? error : ""}
              </p>
            </div>

            <Button
              className="bg-blue-500 font-semibold hover:bg-blue-600"
              fullWidth
              type="submit"
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

AdminLogin.propTypes = {
  handleLoginView: PropTypes.func,
};
