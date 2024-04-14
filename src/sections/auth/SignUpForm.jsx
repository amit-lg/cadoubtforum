import { useEffect, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../utils/validators";
import PropTypes from "prop-types";
import { countryList } from "../../constants/country-list";
import { signupUser } from "../../apiCalls/user/auth";
import ComboBox from "../../components/ComboBox";
import PasswordInput from "../../components/PasswordInput";
import { useDispatch } from "react-redux";
import { getCourses } from "../../apiCalls/courses";
import { openVerifyEmail } from "../../redux/reducers/appReducer";

const SigninForm = ({openTermsAndConditions , termsChecked }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState();
  const [countryCode, setCountryCode] = useState("+91");

  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [phoneErrror, setPhoneError] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(termsChecked);

  // const [course, setCourse] = useState([]);
  const [courseLevels, setCoursesLevels] = useState([]);
  const [batch, setBatch] = useState("");

  const dispatch = useDispatch();

  const initializeForm = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setError("");
    setEmailError(false);
    setPasswordError(false);
    setFirstNameError(false);
    setLastNameError(false);
    setConfirmPassword("");
    setPhone("");
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
    if (e.target.value === "") {
      setPasswordError(false);
    }
    const validated = validatePassword(e.target.value);
    if (!validated) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    const validated = validatePassword(e.target.value);
    if (!validated) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    const validated = validateName(e.target.value);
    if (!validated) {
      setFirstNameError(true);
    } else {
      setLastNameError(false);
    }
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
    const validated = validateName(e.target.value);
    if (!validated) {
      setLastNameError(true);
    } else {
      setLastNameError(false);
    }
  };

  const handlePhone = (e) => {
    e.preventDefault();
    if (e.target.value.length < 10) {
      setPhoneError(true);
    } else if (e.target.value.length === 10) {
      setPhone(e.target.value);
      setPhoneError(false);
    } else {
      setPhoneError(false);
      return;
    }
    setPhone(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValidated = validateEmail(email);
    if (!emailValidated) {
      return;
    }

    const firstNameValidated = validateName(firstName);
    if (!firstNameValidated) {
      return;
    }

    const lastNameValidated = validateName(firstName);
    if (!lastNameValidated) {
      return;
    }

    const passwordValidated = validatePassword(password);
    if (!passwordValidated) {
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setPasswordError(true);
      return;
    }

    const response = await signupUser({
      fname: firstName,
      lname: lastName,
      phone: phone.toString(),
      countryCode: countryCode,
      email: email,
      password: password,
      course: batch,
    });

    if (response.status === 200) {
      initializeForm();
      dispatch(openVerifyEmail());
    } else {
      setError(response.msg);
    }
  };

  const fetchCourses = async () => {
    const response = await getCourses();
    if (response.status === 200) {
      setCoursesLevels(response.data.Level);
    }
  };

  const handleTerm = (e) => {
    setTermsAccepted(e.target.checked);
  };

  useEffect(() => {
    fetchCourses();
  }, [termsAccepted]);

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="space-y-3 flex flex-col w-full">
        <Input
          type="text"
          placeholder={"First name"}
          value={firstName}
          onChange={handleFirstName}
          name={"firstName"}
          error={firstNameError}
          setError={setFirstNameError}
          required={true}
        />

        <Input
          type="text"
          placeholder={"Last name"}
          value={lastName}
          onChange={handleLastName}
          name={"lastName"}
          error={lastNameError}
          setError={setLastNameError}
          required={true}
        />

        <Input
          type="email"
          placeholder={"Enter your email"}
          value={email}
          onChange={handleEmail}
          name={"email"}
          error={emailError}
          setError={setEmailError}
          required={true}
        />

        <select
          onChange={(e) => setBatch(e.target.value)}
          defaultValue=""
          required
          className={`
             p-2 bg-gray-100 w-full rounded-md  text-sm outline-none relative z-20 shadow-md
            ${batch === "" ? "text-gray-400" : "text-black"}
          `}
        >
          <option value="" disabled className="text-gray-400">Select your course</option>
          {courseLevels.map((level) => (
            <>
              {level?.Batches?.map((batch) => (
                <option key={batch?.id} value={batch?.id} className="text-black">
                  {level.Name + " - " + batch.Name}
                </option>
              ))}
            </>
          ))}
        </select>

        <div className="flex flex-row gap-2 ">
          <ComboBox
            data={countryList}
            value={countryCode}
            setValue={setCountryCode}
          />

          <Input
            type="number"
            required={true}
            placeholder={"Enter your phone"}
            value={phone}
            onChange={handlePhone}
            name={"phone"}
            error={phoneErrror}
            className="w-[70%]"
            setError={setPhoneError}
            pattern={"[0-9]*"}
          />
        </div>

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

        <PasswordInput
          type="password"
          placeholder={"Confirm your password"}
          value={confirmPassword}
          onChange={handleConfirmPassword}
          name={"confirmPassword"}
          error={passwordError}
          setError={setPasswordError}
          required={true}
        />

        <div className="h-[10px]">
          <p className="text-red-500 text-center text-xs">
            {error ? error : ""}
          </p>
        </div>

        <div className="flex items-center gap-2 2xl:text-base text-sm">
          <input required checked={termsAccepted} onChange={handleTerm}  type="checkbox" name="terms" id="terms" />
          <label className="text-sm" htmlFor="terms">I Agree to the <span onClick={openTermsAndConditions} className="text-blue-500 cursor-pointer">terms</span> and <span onClick={openTermsAndConditions} className="text-blue-500 cursor-pointer">conditions</span></label>
        </div>
        <Button
          className="bg-blue-500 font-semibold hover:bg-blue-600 shadow-md"
          type="submit"
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default SigninForm;

SigninForm.propTypes = {
  handleLoginView: PropTypes.func,
  openTermsAndConditions: PropTypes.func,
  termsChecked: PropTypes.bool,
};
