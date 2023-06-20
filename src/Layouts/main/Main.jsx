import { Outlet, useLoaderData } from "react-router-dom";
import NavBar from "../navbar/NavBar";

const Main = () => {
  const user = useLoaderData();
  return (
    <>
      <NavBar user={user} />
      <div className="w-screen">
        <Outlet />
      </div>
    </>
  );
};

export default Main;
