import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { dashBoardSteps, dashBoardStepsForMobile } from "../constants/tour-steps";
import { useResponsive } from "../hooks/useResponsive";

const GuidedTour = () => {
  const { isDesktop } = useResponsive();
  const driverObjForDashBoard = driver({
    showProgress: true,
    steps: isDesktop ? dashBoardSteps : dashBoardStepsForMobile,
    popoverClass: "font-popins",
  });

  useEffect(() => {
    if (localStorage.getItem("hasSeenDashboardTour") === "true") {
      return;
    }
    driverObjForDashBoard.drive();
    localStorage.setItem("hasSeenDashboardTour", "true");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop]);

  return null; // GuidedTour component doesn't render anything
};

export default GuidedTour;
