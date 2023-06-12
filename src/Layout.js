import { Outlet, NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="w-screen xs:px-5 sm:px-10 md:px-20 bg-[#212529] flex items-center">
        <NavLink to="/" className="text-lg text-white cursor-pointer mr-2 py-2">Distributa</NavLink>
        <NavLink to="/" className="mr-2 text-[#C7C8C9] text-sm py-2">Share</NavLink>
        <NavLink to="/invoice" className="mr-2 text-[#C7C8C9] text-sm py-2">Invoice</NavLink>
      </div>
      <div className="w-screen">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
