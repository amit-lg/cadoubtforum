import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { allQuestionSteps } from "../constants/tour-steps";

const GuidedTourForAllQuestions = () => {
  const driverObjForAllQuestions = driver({
    showProgress: true,
    steps: allQuestionSteps,
  });

  useEffect(() => {
    if (localStorage.getItem("hasSeenAllQuestionTour") === "true") {
      return;
    }
    driverObjForAllQuestions.drive();
    localStorage.setItem("hasSeenAllQuestionTour", "true");
  }, []);

  return null; // GuidedTour component doesn't render anything
};

export default GuidedTourForAllQuestions;
