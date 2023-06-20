import { Outlet, useLoaderData } from "react-router-dom";
import { PrivateNav } from "../../../Layouts/components";
import { Await } from "react-router-dom";
import { Suspense } from "react";

function PrivateRoute() {
  const data = useLoaderData();
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Await resolve={data}>
        <PrivateNav />
        <div className="w-screen">
          <Outlet />
        </div>
      </Await>
    </Suspense>
  );
}

export default PrivateRoute;
