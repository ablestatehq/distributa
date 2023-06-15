import { useAuth } from "../../../hooks";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppwriteService as appwrite } from "../../../services";

function Private({ children }) {
  const { pathname: from } = useLocation();
  const { session } = useAuth();
  const [ user, setUser] = useState(null)

  useEffect(() => {
    appwrite.getAccount().then(
      user => {
      setUser(user)
    });
  }, [ session ]);
  return user ? children : <Navigate to="/login" state={{ from }} />;
}

export default Private;
