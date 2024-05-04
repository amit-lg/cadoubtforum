import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import {
  allQuestionSteps,
  allQuestionStepsForMobile,
} from "../constants/tour-steps";
import { useResponsive } from "../hooks/useResponsive";

const GuidedTourForAllQuestions = () => {
  const { isDesktop } = useResponsive();
  const driverObjForAllQuestions = driver({
    showProgress: true,
    steps: isDesktop ? allQuestionSteps : allQuestionStepsForMobile,
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
