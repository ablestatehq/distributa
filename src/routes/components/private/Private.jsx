import { useAuth } from "../../../hooks";
import { Navigate, useLocation } from "react-router-dom";

function Private({ children }) {
  const { pathname: from } = useLocation();
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" state={{ from }} />;
}

export default Private;
