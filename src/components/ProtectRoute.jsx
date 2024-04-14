import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken } from "../utils/cookies";

const ProtectRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const token = getAccessToken();

  if (!isAuthenticated && !token) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectRoute;
