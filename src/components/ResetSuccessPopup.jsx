import { useEffect } from "react";

const successImgUrl =
  "https://images.hiverhq.com/blog/wp-content/uploads/2023/09/tr:h-360,w-362,pr-true,cm-pad_resize,bg-FFF4F6/Account-verification-email-templates.png";
const ResetSuccessPopup = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  }, []);
  return (
    <div className="h-screen w-full relative flex items-center justify-center">
      <div className="relative my-6 mx-auto w-[90%] sm:w-[70%] md:w-[70%] lg:w-[60%] xl:w-[30%] z-50 rounded-md bg-white p-5">
        <div className="flex flex-col gap-3 my-5 items-center">
          <h2 className="text-2xl text-blue-500">
            Password Reset Successfully
          </h2>
          <h4 className="text-lg">Please wait redirecting you to login page</h4>
          <img
            className="h-52 w-52 object-contain"
            src={successImgUrl}
            alt="Verify email"
          />
        </div>
      </div>

      <div className="absolute opacity-25 h-full w-full inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default ResetSuccessPopup;
