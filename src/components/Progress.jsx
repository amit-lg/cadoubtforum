import PropTypes from "prop-types";
import { useEffect, useState } from "react";
const Progress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 3.33;
        return newProgress <= 100 ? newProgress : 0;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
      <div
        className={`h-full rounded-full`}
        style={{
          width: `${progress}%`,
          transition: "all ease-in-out 0.1s",
        //   backgroundColor: "#0093E9",
          backgroundImage: "linear-gradient(95deg, #0093E9 0%, #ffffff 100%)",
        }}
      ></div>
    </div>
  );
};

export default Progress;

Progress.propTypes = {
  width: PropTypes.string,
};
