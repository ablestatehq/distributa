import { Navigate, useLocation, Outlet, useLoaderData } from "react-router-dom";

function Private() {
  const { pathname: from } = useLocation();
  const user = useLoaderData();
  return user ? <Outlet /> : <Navigate to="/login" state={{ from }} />;
}

export default Private;
