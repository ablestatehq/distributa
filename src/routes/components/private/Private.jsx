import { useAuth } from "../../../hooks";
import { Navigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

function Private() {
  const { user } = useAuth();
  const location = useLocation();
  const from =
    location.pathname?.from === "login"
      ? "/dashboard"
      : location?.pathname?.from;
  return user ? <Outlet /> : <Navigate to="/login" state={{ from }} />;
}

export default Private;
