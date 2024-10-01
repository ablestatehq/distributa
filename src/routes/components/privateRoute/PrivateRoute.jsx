import { Outlet, useLoaderData } from "react-router-dom";
import { SideBar, Header, MobileNav } from "../../../Layouts/components";
import { Await } from "react-router-dom";
import { Suspense, useState } from "react";

function PrivateRoute() {
  const data = useLoaderData();
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleToggleMenu = () => setToggleMenu((toggleMenu) => !toggleMenu);

  return (
    <Suspense fallback={<div>loading...</div>}>
      <Await resolve={data}>
        <div className="w-screen h-screen overflow-scroll flex flex-col md:flex-row justify-end">
          <Header handleToggleMenu={handleToggleMenu} toggleMenu={toggleMenu} />
          <SideBar />
          <div className="relative md:static flex-1 h-full w-full md:flex md:flex-row">
            <MobileNav
              toggleMenu={toggleMenu}
              handleMenuToggle={handleToggleMenu}
            />
            <Outlet />
          </div>
        </div>
      </Await>
    </Suspense>
  );
}

export default PrivateRoute;
