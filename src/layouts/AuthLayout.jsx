import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/cookies";

const AuthLayout = () => {
  const navigate = useNavigate();
  const token = getAccessToken();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <div className="h-screen w-full">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
