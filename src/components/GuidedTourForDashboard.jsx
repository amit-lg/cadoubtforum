import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import {
  dashBoardSteps,
  
} from "../constants/tour-steps";

const GuidedTour = () => {
  const driverObjForDashBoard = driver({
    showProgress: true,
    steps: dashBoardSteps,
  });

  useEffect(() => {
    if (localStorage.getItem("hasSeenDashboardTour") === "true") {
      return;
    }
    driverObjForDashBoard.drive();
    localStorage.setItem("hasSeenDashboardTour", "true");
  }, []);

  return null; // GuidedTour component doesn't render anything
};

export default GuidedTour;
