import { Outlet } from "react-router-dom";
import { PublicNav } from "../components";

const Main = () => {
  return (
    <>
      <PublicNav />
      <div className="w-screen">
        <Outlet />
      </div>
    </>
  );
};

export default Main;
