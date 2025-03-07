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
        <div className="h-screen w-screen overflow-hidden flex flex-1 flex-col md:flex-row justify-start">
          <Header handleToggleMenu={handleToggleMenu} toggleMenu={toggleMenu} />
          <SideBar />
          <div className="relative lg:static flex flex-1 md:flex md:flex-row overflow-hidden">
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
