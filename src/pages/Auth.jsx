import { useState } from "react";
import SigninForm from "../sections/auth/SignInForm";
import SignUpForm from "../sections/auth/SignUpForm";
import TermsAndConditions from "../pages/TermsAndCondition";
import VerifyEmailPopup from "../components/VerifyEmailPopup";
import { closeVerifyEmail } from "../redux/reducers/appReducer";
import { useSelector } from "react-redux";
import { AuthAnimationMemo } from "../components/AuthAnimation";

const Auth = () => {
  const [loginView, setLoginView] = useState(true);
  const [termsAndConditionView, setTermsAndConditionView] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { showVerifyEmail } = useSelector((state) => state.app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState();
  const [countryCode, setCountryCode] = useState("+91");
  const [courseLevels, setCoursesLevels] = useState([]);
  const [batch, setBatch] = useState("");
  const [date, setDate] = useState(new Date());

  const onAccept = () => {
    setTermsAccepted(true);
    setTermsAndConditionView(false);
  };

  const onDecline = () => {
    setTermsAndConditionView(false);
    setTermsAccepted(false);
  };

  const handleTermsAndConditionView = () => {
    setTermsAndConditionView(!termsAndConditionView);
  };

  const handleLoginView = (value) => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setCountryCode("+91");
    setCoursesLevels([]);
    setBatch("");
    setLoginView(value);
    setDate(new Date());
  };


  return (
    <div className="h-full w-full flex items-center justify-center bg-blue-100">
      <div
        className={`relative ${
          termsAndConditionView
            ? "h-[50%] w-[80%] md:w-[45%] lg:w-[25%] rounded-md"
            : "rounded-3xl h-[90%] lg:[95%] w-[60%]"
        } hidden lg:flex items-center justify-center shadow-custom bg-white transition-all ease-in-out duration-500`}
      >
        {termsAndConditionView ? (
          <TermsAndConditions onAccept={onAccept} onDecline={onDecline} />
        ) : (
          <>
            <div className="fade-enter h-full flex items-center justify-center w-full">
              <div className="h-full flex items-center justify-between w-full relative">
                <div
                  className={`
                w-[50%] h-full transform transition-all ease-in-out duration-700 flex items-center justify-center
              `}
                >
                  <div className="w-full flex items-center justify-center flex-col">
                    <img
                      src="https://ik.imagekit.io/vt3qjswze/AB%20Logo/ABLOGO41.png?updatedAt=1697009845701\"
                      alt="aswini bajaj"
                      className="h-[50px] w-[50px] xl:h-[100px] xl:w-[100px]"
                    />
                    <h1 className="mb-5 md:text-2xl xl:text-3xl text-center font-semibold text-slate-500">
                      Sign In
                    </h1>
                    <div className="w-[60%] flex items-center justify-center">
                      <SigninForm />
                    </div>
                  </div>
                </div>

                <div
                  className={`
                w-[50%] h-full transform transition-all ease-in-out duration-700 flex items-center justify-center
              `}
                >
                  <div className="w-full flex items-center justify-center flex-col">
                    <img
                      key={Date.now()}
                      src="https://ik.imagekit.io/vt3qjswze/AB%20Logo/ABLOGO41.png?updatedAt=1697009845701\"
                      alt=""
                      className="h-[50px] w-[50px] md:w-[70px] md:h-[70px] xl:w-[80px] xl:h-[80px] 2xl:h-[100px] 2xl:w-[100px] object-cover"
                    />

                    <h1 className="mb-2 xl:text-2xl 2xl:text-4xl lg:text-xl text-center font-semibold text-slate-500">
                      Create an Account
                    </h1>
                    <div className="2xl:w-[60%] w-[70%] flex items-center justify-center">
                      <SignUpForm
                        firstName={firstName}
                        lastName={lastName}
                        email={email}
                        password={password}
                        confirmPassword={confirmPassword}
                        phone={phone}
                        countryCode={countryCode}
                        setFirstName={setFirstName}
                        setLastName={setLastName}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        setConfirmPassword={setConfirmPassword}
                        setPhone={setPhone}
                        setCountryCode={setCountryCode}
                        termsChecked={termsAccepted}
                        openTermsAndConditions={handleTermsAndConditionView}
                        courseLevels={courseLevels}
                        setCoursesLevels={setCoursesLevels}
                        batch={batch}
                        setBatch={setBatch}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

           <AuthAnimationMemo date={date} loginView={loginView} handleLoginView={handleLoginView} />  
          </>
        )}
      </div>

      {showVerifyEmail && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[100] outline-none focus:outline-none">
          <VerifyEmailPopup handleClose={closeVerifyEmail} />
        </div>
      )}

      <div className="shadow overflow-hidden bg-white p-4 w-[90%] sm:w-[60%] md:w-[40%] h-fit rounded-3xl flex lg:hidden relative">
        {termsAndConditionView ? (
          <TermsAndConditions
            onAccept={onAccept}
            onDecline={onDecline}
            handleTermsAndConditionView={handleTermsAndConditionView}
          />
        ) : (
          <>
            {loginView ? (
              <div
                className={`
                w-full h-auto transform transition-all ease-in-out duration-700 flex items-center justify-center gap-5 relative z-50
              `}
              >
                <div className="flex items-center justify-center flex-col gap-3 w-full">
                  <img
                    width={100}
                    height={100}
                    src="https://ik.imagekit.io/vt3qjswze/AB%20Logo/ABLOGO41.png?updatedAt=1697009845701\"
                    alt=""
                  />
                  <h1 className="text-3xl lg:text-4xl font-semibold text-black mb-3">
                    Sign In
                  </h1>
                  <div className="w-full flex items-center justify-center">
                    <SigninForm />
                  </div>
                  <div>
                    <p className="text-sm">
                      Don&apos;t have an account
                      <span
                        className="ml-2 underline"
                        onClick={() => handleLoginView(false)}
                      >
                        Signup
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={`
                 w-full h-auto transform transition-all ease-in-out duration-700 flex items-center justify-center gap-5 relative z-50
              `}
              >
                <div className="flex items-center justify-center flex-col gap-3 w-full">
                  <img
                    width={100}
                    height={100}
                    src="https://ik.imagekit.io/vt3qjswze/AB%20Logo/ABLOGO41.png?updatedAt=1697009845701\"
                    alt=""
                  />
                  <h1 className="text-3xl  font-semibold text-black mb-3">
                    Create an Account
                  </h1>
                  <div className="w-full flex items-center justify-center">
                    <SignUpForm
                      firstName={firstName}
                      lastName={lastName}
                      email={email}
                      password={password}
                      confirmPassword={confirmPassword}
                      phone={phone}
                      countryCode={countryCode}
                      setFirstName={setFirstName}
                      setLastName={setLastName}
                      setEmail={setEmail}
                      setPassword={setPassword}
                      setConfirmPassword={setConfirmPassword}
                      setPhone={setPhone}
                      setCountryCode={setCountryCode}
                      termsChecked={termsAccepted}
                      openTermsAndConditions={handleTermsAndConditionView}
                      courseLevels={courseLevels}
                      setCoursesLevels={setCoursesLevels}
                      batch={batch}
                      setBatch={setBatch}
                    />
                  </div>
                  <div className="pb-6">
                    <p className="text-sm">
                      Already have an account
                      <span
                        className="ml-2 underline"
                        onClick={() => handleLoginView(true)}
                      >
                        Signin
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
