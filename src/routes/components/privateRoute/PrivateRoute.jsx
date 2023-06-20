import { Outlet } from "react-router-dom";
import { PrivateNav } from "../../../Layouts/components";

function PrivateRoute() {
  return (
    <>
      <PrivateNav />
      <div className="w-screen">
        <Outlet />
      </div>
    </>
  );
}

export default PrivateRoute;
