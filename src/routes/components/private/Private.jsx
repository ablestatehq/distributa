import { useAuth } from "../../../hooks";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppwriteService as Appwrite } from "../../../services";

function Private() {
  const { pathname: from } = useLocation();
  const { session } = useAuth();
  const [ user, setUser] = useState(null)
  const appwrite = new Appwrite();

  useEffect(() => {
    appwrite.getAccount().then(
      user => {
      setUser(user)
    });
  }, [ session ]);
  return user ? <Outlet/> : <Navigate to="/login" state={{ from }} />;
}

export default Private;
