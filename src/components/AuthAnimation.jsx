import React from "react";
import Button from "./Button";
import PropTypes from "prop-types";
const AuthAnimation = ({ loginView, handleLoginView, date }) => {
  return (
    <div
      className={`${loginView ? "bg-yellow-gradient" : "bg-blue-gradient"
        }  h-full flex items-center justify-center flex-col gap-2 absolute top-0 left-0 w-1/2 transition-all ease-in-out duration-700
            ${loginView && "translate-x-full"}
            ${loginView
          ? "rounded-r-xl rounded-l-[150px] lg:rounded-r-2xl lg:rounded-l-[200px] xl:rounded-r-3xl xl:rounded-l-[210px]"
          : "rounded-l-xl rounded-r-[150px] lg:rounded-l-2xl lg:rounded-r-[200px] xl:rounded-l-3xl xl:rounded-r-[210px]"
        }
        `}
    >
      <div
        className={
          "w-full h-full flex flex-col gap-3 items-center justify-center"
        }
      >
        <div className="flex flex-col w-full">
          {loginView ? (
            <h1 className="2xl:text-3xl xl:text-2xl text-center lg:text-2xl mx-auto font-semibold text-white">
              Welcome Back, Future CA!
            </h1>
          ) : (
            <h1 className="text-center xl:text-3xl lg:text-2xl  mx-auto font-semibold text-white">
              Welcome, CA Aspirant!
            </h1>
          )}
          {/* {loginView ? ( */}
          <img
            src={`./login.svg?${date}`}
            alt=""
            className={`${loginView ? "block mx-auto w-[50%]  fade-out" : "hidden"
              }`}
          // key={Date.now()}
          />
          {/* ) : ( */}
          <img
            src={`./signup.svg?${date}`}
            alt=""
            className={`${loginView ? "hidden" : "block  mx-auto w-[50%]"}`}
          // key={Date.now()}
          />
          {/* )} */}
          {loginView ? (
            <h3 className="text-white  text-sm text-center w-[300px] mx-auto">
              Reconnect, participate in discussions, share insights, find solutions, and keep the
              momentum going!
            </h3>
          ) : (
            <h3 className="px-3 text-white  text-sm text-center w-[300px] xl:w-[420px] mx-auto">
              Let&apos;s embark on this learning adventure together. Dive into discussions, seek
              answers, share experiences, and build connections with fellow learners on your CA
              journey. Let&apos;s grow together!

            </h3>
          )}
        </div>
        {loginView ? (
          <>
            <Button
              className="mt-2 shadow-btn bg-gray-200 bg-opacity-40 lg:px-[64px] md:px-[30px] px-[20px] text-[1rem] leading-[1.75rem]"
              type="button"
              onClick={() => handleLoginView(false)}
            >
              Sign Up
            </Button>
          </>
        ) : (
          <Button
            className="mt-2 bg-gray-200 shadow-btn bg-opacity-40 lg:px-[64px] md:px-[30px] px-[20px] text-[1rem] leading-[1.75rem]"
            type="button"
            onClick={() => handleLoginView(true)}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export const AuthAnimationMemo = React.memo(AuthAnimation);

AuthAnimation.propTypes = {
  loginView: PropTypes.bool.isRequired,
  handleLoginView: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired
};
