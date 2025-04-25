import { Outlet, useLoaderData } from "react-router-dom";
import { SideBar } from "../../../Layouts/components";
import { Await } from "react-router-dom";
import { Suspense } from "react";

function PrivateRoute() {
  const data = useLoaderData();

  return (
    <Suspense fallback={<div>loading...</div>}>
      <Await resolve={data}>
        <div className="h-screen w-screen overflow-hidden flex flex-1 flex-col md:flex-row justify-start">
          <SideBar />
          <div className="relative lg:static flex flex-1 md:flex md:flex-row overflow-hidden">
            <Outlet />
          </div>
        </div>
      </Await>
    </Suspense>
  );
}

export default PrivateRoute;
