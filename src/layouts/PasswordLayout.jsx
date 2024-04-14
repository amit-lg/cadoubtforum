import { Outlet, useLocation } from "react-router-dom";

const PasswordLayout = () => {
    const location = useLocation();

  return (
    <div className="relative overflow-hidden h-screen w-full bg-white flex justify-center items-center p-5">
      <div className="w-[90%] sm:w-[70%] md:w-[80%] xl:w-[70%] h-[400px] md:h-[500px] xl:h-[700px] flex bg-white shadow-custom-blue rounded-lg items-center relative z-10">
        {/* Img */}
        <div className="hidden md:flex h-full w-[50%] items-center">
          <img className="w-full h-full object-contain" src={location.pathname === "/forgot-password" ? `/forget-password.svg?date=${new Date().getTime()}` : `/reset-password.svg?date=${new Date().getTime()}`} alt={location.pathname === "/forgot-password" ? "forget password" : "reset password"} />
        </div>

        {/* Form */}
        <div className="w-full md:w-[50%] flex items-center h-full">
          <Outlet />
        </div>
      </div>
      <div className="absolute opacity-25 inset-0 z-0 bg-blue-500 h-[1000px] w-[1000px] rounded-full top-[30%] left-[60%]"></div>
    </div>
  );
};

export default PasswordLayout;
