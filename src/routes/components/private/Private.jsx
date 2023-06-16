import { useAuth } from "../../../hooks";
import { Navigate, useLocation } from "react-router-dom";

function Private({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  const from = location.pathname?.from === "login" ? "/dashboard" : location?.pathname?.from
  return (
     user ? children : <Navigate to="/login" state={{ from }} />
  );
}

export default Private;
